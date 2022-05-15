// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPybMgk157LDkM49OurqGnu8YX9-K71yk",
  authDomain: "hamakum-40448.firebaseapp.com",
  projectId: "hamakum-40448",
  storageBucket: "hamakum-40448.appspot.com",
  messagingSenderId: "667623969335",
  appId: "1:667623969335:web:ef5fe7ebc581146940e5b2",
  measurementId: "G-44FK0H3CZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export default {firestore, app, auth};