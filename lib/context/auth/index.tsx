import { formatUser } from '@/utils/helpers/format-user';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config';
import { IAuthContext, IAuthContextProvider, IAuthState } from './types';
import { IUser } from '@/utils/types';

const initialState = {
  user: undefined,
  setUser: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [state, setState] = useState<IAuthState>(initialState);

  useEffect(() => {
    if (loading) return console.log('AUTH LOADING..');

    if (!user?.uid) return console.log('NOT AUTHENTICATED');

    // check for user in cookie
    const userCookie = Cookies.get('user');
    if (userCookie) {
      console.log('FETCHING FROM COOKIES..');
      const activeUser = JSON.parse(userCookie);

      console.log('USER PRESENT (cookies) ===>', activeUser.displayName);

      setState((prev) => ({ ...prev, user: activeUser }));
      return;
    }

    // else set from firestore
    const fetchUser = async () => {
      try {
        console.log('FETCHING FROM FIREBASE..');

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return console.log('NO USER');

        const payload: IUser = formatUser(docSnap);

        console.log('USER PRESENT IN DB');

        Cookies.set('user', JSON.stringify(payload));

        setState((prev) => ({ ...prev, user: payload }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [loading, user]);

  const handleLogin = async () => {
    try {
      console.log('authenticating...');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('user');
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const setUser = (user: IUser) => {
    setState((prev) => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ state, setUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
