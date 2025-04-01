 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP0IRWYuiV93GAim7fa7aw9TRkfG79YAw",
  authDomain: "trip-planner-7cd1a.firebaseapp.com",
  projectId: "trip-planner-7cd1a",
  storageBucket: "trip-planner-7cd1a.firebasestorage.app",
  messagingSenderId: "617758851420",
  appId: "1:617758851420:web:1992157b35a1cce09a8199",
  measurementId: "G-SY4LCDEXMW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);