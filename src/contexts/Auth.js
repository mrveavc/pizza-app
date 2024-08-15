import React, { useContext, useState, useEffect } from "react";
import { auth ,db} from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,

} from "firebase/auth";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {

      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);


      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const login = async (email, password) => {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "products", user.uid), {
        products: []  
      });
  
      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const logout = async() => {
    return auth.signOut();
  }
  async function handleLogout() {
    try {
      logout();

    } catch {
     console.log("çıkış yapılamadı")
    }
  }
  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
    setCurrentUser,
    login,
    register,
    handleLogout,logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
