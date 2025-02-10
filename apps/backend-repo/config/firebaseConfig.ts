import * as admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: admin.credential.cert("./service_account.json"),
});

export const firestore = getFirestore();
export const auth = getAuth();
