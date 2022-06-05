// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
import { getFirestore,collection, getDocs, setDoc, doc ,addDoc} from 'firebase/firestore';


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
  measurementId: "G-RC8GW42M1D"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB04ei02_pRE6thYtg8jMMOVBKaOxQdllo",
//   authDomain: "text-197b8.firebaseapp.com",
//   projectId: "text-197b8",
//   storageBucket: "text-197b8.appspot.com",
//   messagingSenderId: "912021751581",
//   appId: "1:912021751581:web:f9f4b851da5b5e797a83f4"
// };


// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const firestore = getFirestore(app);
 export const auth = getAuth(app);

// export  {firestore,app,auth};

 //export const auth = getAuth();
//export const db = getDatabase(app);
// const app = initializeApp(firebaseConfig);
export default app;
// const auth = getAuth(app);

async function getDetailsUserById(userId) {
  console.log("users =====")
  console.log(userId)
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
