"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    deleteUser
} from 'firebase/auth';
import { auth } from '@/firebase';

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  finishedValidating: boolean;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Define the constants for the user and loading state
    const [user, setUser] = useState<UserType>({ email: null, uid: null, photoURL: null, emailVerified: false, finishedValidating: false});
    const [loading, setLoading] = useState<Boolean>(true);

    // Update the state depending on auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            if (userData !== null) {
              setUser({
                  email: userData.email,
                  uid: userData.uid,
                  photoURL: userData.photoURL,
                  emailVerified: userData.emailVerified,
                  finishedValidating: true
              });
            } else {
                setUser({ email: null, uid: null, emailVerified: false, finishedValidating: true });
            }
        });
        setLoading(false);
        return () => unsubscribe && unsubscribe();
    }, [auth]);
    
    // Sign up the user
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const sendVerificationEmail = async () => {
      return sendEmailVerification(auth.currentUser)
    }
    
    const sendResetPassword = async () => {
      return sendPasswordResetEmail(auth, user.email)
    }

    // Login the user
    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    
    // Change Users Email
    const changeEmail = (newEmail: string) => {
      return updateEmail(auth.currentUser,newEmail )
    };
    
    const setPhotoUrl = (newPhotoURL: string) => {
        return updateProfile(auth.currentUser, { photoURL: newPhotoURL} )
    };

    // Logout the user
    const logOut = async () => {
        setUser({ email: null, uid: null, emailVerified: null, photoURL: null , finishedValidating: true});
        return await signOut(auth);
    };
    
    // delete the user
    const deleteAccount = async () => {
        setUser({ email: null, uid: null, emailVerified: null, photoURL: null, finishedValidating: true});
        return await deleteUser(auth.currentUser);
    };

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut, changeEmail, setPhotoUrl, sendVerificationEmail, sendResetPassword, sendResetPassword, deleteAccount}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
