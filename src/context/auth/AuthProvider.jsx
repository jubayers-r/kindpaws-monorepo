import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const logOut = () => signOut(auth);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const githubLogin = () => signInWithPopup(auth, githubProvider)

  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  const authInfo = {
    logOut,
    createUser,
    logIn,
    user,
    setUser,
    stateData,
    setStateData,
    googleLogin,
    loading,
    setLoading,
    forgotPassword,
    githubLogin
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
