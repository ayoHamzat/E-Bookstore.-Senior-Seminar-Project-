// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi-oGXdKEU-2Q1DYx5pnRwEKX2mMta4cg",
  authDomain: "e-bookstore-app.firebaseapp.com",
  projectId: "e-bookstore-app",
  storageBucket: "e-bookstore-app.firebasestorage.app",
  messagingSenderId: "104501813926",
  appId: "1:104501813926:web:8b8ae453fcd77522d24a67",
  measurementId: "G-7JW3WX8T6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =  getAuth(app);