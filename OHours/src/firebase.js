import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSfeLVEVhs6j0uNsi9fIxxayZMPbEup1g",
  authDomain: "ohours.firebaseapp.com",
  projectId: "ohours",
  storageBucket: "ohours.appspot.com",
  messagingSenderId: "558747405743",
  appId: "1:558747405743:web:de6600f44afdbe4c9a335a",
  measurementId: "G-XXWW390RPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and export it
export const db = getFirestore(app);

// If you need to export the app or analytics, you can do so like this:
export { app, analytics };