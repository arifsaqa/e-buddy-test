"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUsers } from "../redux/actions/users";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { signin, signout } from "../redux/actions/auth";

const UserC = () => {
  const dispatch = useAppDispatch();
  const { isLoggedin, user } = useAppSelector((state) => state.authReducer);

  const handleLoginGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(signout());
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          const { uid, providerId, displayName, email, photoURL, phoneNumber } =
            user;

          if (token) {
            dispatch(
              signin({
                token,
                user: {
                  uid,
                  providerId,
                  displayName,
                  email,
                  photoURL,
                  phoneNumber,
                },
              })
            );
          }
        });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      {!isLoggedin ? (
        <button onClick={handleLoginGoogle} type="button">
          logingoogle
        </button>
      ) : (
        <>
          loggedin as {user?.displayName} - {user?.email}
          <button onClick={handleSignOut} type="button">
            signout
          </button>
        </>
      )}
    </div>
  );
};

export default UserC;
