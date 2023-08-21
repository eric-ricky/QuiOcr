import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { IUser } from '../types';

export const formatUser = (docSnap: DocumentSnapshot<DocumentData>) => {
  const payload: IUser = {
    uid: docSnap.data()?.uid,
    displayName: docSnap.data()?.displayName,
    email: docSnap.data()?.email,
    photoURL: docSnap.data()?.photoURL,
    createdAt: docSnap.data()?.createdAt,
    phone: docSnap.data()?.phone,
  };
  return { ...payload };
};
