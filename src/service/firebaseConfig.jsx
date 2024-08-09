// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore}from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg8FT09L4AZv5HmFMlPZoSxcidsj-07LM",
  authDomain: "ai-trip-planning-f19a2.firebaseapp.com",
  projectId: "ai-trip-planning-f19a2",
  storageBucket: "ai-trip-planning-f19a2.appspot.com",
  messagingSenderId: "1074661613093",
  appId: "1:1074661613093:web:3dcb91a5ecb81ce196e9cc",
  measurementId: "G-N60KPXZBS5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

