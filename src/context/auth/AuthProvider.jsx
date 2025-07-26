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
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stateData, setStateData] = useState(null);

  // Monitor Firebase login state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const idToken = await currentUser.getIdToken();

        try {
          await axios.post(
            "http://localhost:8000/api/jwt",
            { firebaseToken: idToken },
            { withCredentials: true }
          );
        } catch (error) {
          console.error("JWT exchange failed:", error);
        }
      }
    });

    return () => unSubscribe();
  }, []);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const githubLogin = () => signInWithPopup(auth, githubProvider);

  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logIn,
    logOut,
    createUser,
    forgotPassword,
    googleLogin,
    githubLogin,
    stateData,
    setStateData,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
