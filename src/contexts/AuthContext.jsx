import { useContext } from "react";
import { createContext, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase";

/**
 * @typedef AuthContextData
 * @property {{displayName: string; email: string; photoURL: string} | null} user
 * @property {boolean} isLoading
 */

const AuthContext = createContext();

const googleAuthProvider = new GoogleAuthProvider();

export const useAuthContext = () => {
  /** @type {AuthContextData | undefined} */
  const data = useContext(AuthContext);
  if (!data) throw new Error("Cannot Use Auth Context Outside It's Provider.");

  return data;
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  const registerUser = async ({ displayName, photoURL, email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName, photoURL });
    } catch (error) {
      console.error(error.message, error);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message, error);
    }
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const authContextData = { user: currentUser, isLoading, registerUser, loginUser, loginWithGoogle, logout };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};
