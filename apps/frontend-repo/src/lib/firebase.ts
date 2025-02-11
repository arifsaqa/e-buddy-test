import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFb,
  UserInfo,
} from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signinWithGoogle = async () => {
  const credential = await signInWithPopup(auth, new GoogleAuthProvider());
  const token = await credential.user.getIdToken();
  const { uid, providerId, displayName, email, photoURL, phoneNumber } =
    credential.user;
  const user = {
    uid,
    providerId,
    displayName,
    email,
    photoURL,
    phoneNumber,
  };
  return { user, token };
};

export const signinWithEmailNPassword = async (
  inputEmail: string,
  inputPassword: string
) => {
  const credential = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
  const token = await credential.user.getIdToken();
  const { uid, providerId, displayName, email, photoURL, phoneNumber } =
    credential.user;
  const user = {
    uid,
    providerId,
    displayName,
    email,
    photoURL,
    phoneNumber,
  };
  return { user, token };
};

export const authStateChange = (cb: (user: UserInfo, token: string) => void) =>
  onAuthStateChanged(auth, (user) => {
    user?.getIdToken().then((token) => {
      const { uid, providerId, displayName, email, photoURL, phoneNumber } =
        user;
      cb({ uid, providerId, displayName, email, photoURL, phoneNumber }, token);
    });
  });

export const signOut = () => signOutFb(auth);
