// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSfeLVEVhs6j0uNsi9fIxxayZMPbEup1g",
  authDomain: "ohours.firebaseapp.com",
  projectId: "ohours",
  storageBucket: "ohours.appspot.com",
  messagingSenderId: "558747405743",
  appId: "1:558747405743:web:f2d99785fc5aaacc9a335a",
  measurementId: "G-7RHGCG7P93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);