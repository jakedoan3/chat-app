import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4qnPeeNNHeE7brMyJPu57puQjKPTwDwQ",
  authDomain: "chat-dev-ab6c6.firebaseapp.com",
  projectId: "chat-dev-ab6c6",
  storageBucket: "chat-dev-ab6c6.appspot.com",
  messagingSenderId: "1006723105755",
  appId: "1:1006723105755:web:64e8c7102864690a6e1dfe",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
