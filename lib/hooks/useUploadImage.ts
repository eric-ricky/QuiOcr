import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { storage } from '../firebase/config';

const useUploadImage = (label: string) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [photoURL, setPhotoURL] = useState('');
  const [uploadingError, setUploadingError] = useState<string | undefined>(
    undefined
  );

  const SUPPORTED_FORMATS = ['image/png', 'image/jpeg'];

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);
    setUploadingError(undefined);
    setProgress(0);

    const imgFile = e.target.files[0];

    console.log('file ===>', imgFile);

    if (!SUPPORTED_FORMATS.includes(imgFile.type)) {
      setUploading(false);
      setUploadingError('Unsupported file format');
      return;
    }

    try {
      const fileRef = ref(
        storage,
        `Images/${label}/${new Date().toString().split(' ').join('-')}.${
          imgFile.name
        }`
      );

      const uploadTask = uploadBytesResumable(fileRef, imgFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const uploadProgress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(uploadProgress);
        },
        (err) => {
          console.log(err);
          setUploading(false);
          setUploadingError('Something went wrong!');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            console.log(url);
            setPhotoURL(url);
            setProgress(0);
            setUploading(false);
          });
        }
      );
    } catch (error) {
      console.log(error);
      setUploadingError('Something went wrong');
      setUploading(false);
    }
  };

  return {
    handleUpload,
    uploading,
    uploadingError,
    setUploadingError,
    photoURL,
    progress,
    setPhotoURL,
  };
};

export default useUploadImage;
