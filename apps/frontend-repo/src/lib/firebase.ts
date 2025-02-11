import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserInfo,
} from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signinWithGoogle = (cb: (user: UserInfo, token: string) => void) =>
  signInWithPopup(auth, new GoogleAuthProvider()).then((credential) => {
    credential.user.getIdToken().then((token) => {
      const { uid, providerId, displayName, email, photoURL, phoneNumber } =
        credential.user;
      cb({ uid, providerId, displayName, email, photoURL, phoneNumber }, token);
    });
  });

export const signinWithEmailNPassword = (
  email: string,
  password: string,
  cb: (user: UserInfo, token: string) => void
) =>
  signInWithEmailAndPassword(auth, email, password).then((credential) => {
    credential.user.getIdToken().then((token) => {
      const { uid, providerId, displayName, email, photoURL, phoneNumber } =
        credential.user;
      cb({ uid, providerId, displayName, email, photoURL, phoneNumber }, token);
    });
  });

export { auth };
