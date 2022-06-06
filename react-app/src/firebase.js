// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
import { getFirestore,collection, getDocs, setDoc, doc ,addDoc} from 'firebase/firestore';
import {getStorage} from "firebase/storage"
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
  appId: "1:667623969335:web:97e4c870aaaa59b740e5b2",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const firestore = getFirestore(app);
 export const auth = getAuth(app);
 export const storage = getStorage(app)

export default app;


async function getDetailsUserById(userId) {
  let userJson = {};
  const users = collection(firestore, 'users');

  const usersSnapshot = await getDocs(users);
  usersSnapshot.docs.map((doc) => {
    if (doc.id === userId) {
      userJson = doc.data();
    }
  });

  return userJson;
}
async function updateDetailsUserById(userId,userJson) {
  await setDoc(doc(firestore, "users", userId), { "fname": userJson.fname,  "address": userJson.address, "phoneNumber": userJson.phoneNumber });

}
async function createNewReportByIdDoc( reportJson) {
  await addDoc(collection(firestore, 'reports'), {
    doc:reportJson
  })
  
}


export { getDetailsUserById, updateDetailsUserById ,createNewReportByIdDoc}
