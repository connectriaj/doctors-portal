import React from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();
export const ThemeContext = createContext();

const auth = getAuth(app);

const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(false);

  // user create account using email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // user login throw existing email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = (email, password) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // update user (name, photo)
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  // google user email verification
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // forget password
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // logOut user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // for user observation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser === null || currentUser.emailVerified) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // for theme toggling
  useEffect(() => {
    const rootElement = window.document.documentElement;
    if (theme) {
      rootElement.classList.add("dark");
      rootElement.classList.remove("light");
    } else {
      rootElement.classList.add("light");
      rootElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  // for all pages share
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    updateUser,
    verifyEmail,
    forgetPassword,
    logOut,
    googleLogin,
  };

  return (
    <>
      <AuthContext.Provider value={authInfo}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default Authentication;
