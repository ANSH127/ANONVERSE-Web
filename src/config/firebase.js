// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "anonverse-9a191.firebaseapp.com",
  projectId: "anonverse-9a191",
  storageBucket: "anonverse-9a191.appspot.com",
  messagingSenderId: "684576067991",
  appId: "1:684576067991:web:ee29d5b46b628f98c9f4d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);