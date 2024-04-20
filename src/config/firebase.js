
import { initializeApp } from "firebase/app";
import { getFirestore, collection} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "anonverse-9a191.firebaseapp.com",
  projectId: "anonverse-9a191",
  storageBucket: "anonverse-9a191.appspot.com",
  messagingSenderId: "684576067991",
  appId: "1:684576067991:web:ee29d5b46b628f98c9f4d2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const usersRef =collection(db, "users");
export const confessionRef = collection(db, 'confession');
export const storage = getStorage(app);

export default app;

