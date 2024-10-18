import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyCSfeLVEVhs6j0uNsi9fIxxayZMPbEup1g",
  authDomain: "ohours.firebaseapp.com",
  databaseURL: "https://ohours-default-rtdb.firebaseio.com/", // Add this line for Realtime Database
  projectId: "ohours",
  storageBucket: "ohours.appspot.com",
  messagingSenderId: "558747405743",
  appId: "1:558747405743:web:de6600f44afdbe4c9a335a",
  measurementId: "G-XXWW390RPS",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { app, db };
