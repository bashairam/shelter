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

async function getReportById(id_homeless) {
  let reportsLst = [];
  const reports = collection(firestore, 'reports');

  const reportsSnapshot = await getDocs(reports);

  reportsSnapshot.docs.map((doc) => {
    let currDoc = doc.data()
    currDoc = {...currDoc,idDoc:doc.id}
    if (currDoc['createdFor'] === id_homeless) {
      reportsLst.push(currDoc);
      
 
    }
  });

  return reportsLst;
}

async function getReportByIdDoc(idDoc) {

  const reports = collection(firestore, 'reports');

  const reportsSnapshot = await getDocs(reports);

  let res ;
  reportsSnapshot.docs.map((doc) => {
    if(doc.id == idDoc){

     res = doc.data();
    }
  
  
  });

  return res;
}
async function getDetailsHomelessesById(id) {
 
  let homelessesJson = {};
  const homelesses = collection(firestore, 'homelesses');

  const homelessSnapshot = await getDocs(homelesses);
  homelessSnapshot.docs.map((doc) => {
    if (doc.id === id) {
      homelessesJson = doc.data();
    }
  });
  
  const {room,stage,date} = await getRoomNoAndStageForHomelessById(id);
  const {addiction_History,background,criminalRecord,psycoticPast,therapeutic_history}= await getHistoryById (id);
  return {...homelessesJson,room,stage,date,addiction_History,background,criminalRecord,psycoticPast
    ,therapeutic_history};
}

async function getHistoryById(id_homeless) {

  let historyJson = {};
  const history = collection(firestore, 'history');

  const HistortSnapshot = await getDocs(history);
  HistortSnapshot.docs.map((doc) => {
    if (doc.id === id_homeless) {
      historyJson = doc.data();
    }
  });

  return historyJson;
}

async function getRoomNoAndStageForHomelessById(id_homeless) {

  let resJson = {};
  const inHomelesses = collection(firestore, 'inHomelesses');

  const inHomelessesSnapshot = await getDocs(inHomelesses);
  inHomelessesSnapshot.docs.map((doc) => {
    if (doc.id === id_homeless) {
      resJson = doc.data();
    }
    return null;
  });

  return resJson;
}


async function updateDetailsUserById(userId,userJson) {
  await setDoc(doc(firestore, "users", userId), { "fname": userJson.fname,  "email": userJson.email, "phoneNumber": userJson.phoneNumber,"type": userJson.type });

}
async function createNewReportByIdDoc( reportJson) {
  await addDoc(collection(firestore, 'reports'), reportJson)
  
}
async function updateReportByIdDoc( reportId,reportJson) {
  await setDoc(doc(firestore, "reports", reportId), reportJson);

  
}
async function updateHomeless (homelessesJson) {
  console.log("test");
  await setDoc(doc(firestore, "homelesses",homelessesJson.id), {
   name: homelessesJson.name,
   age: Number (homelessesJson.age),
   date: homelessesJson.date,
   personalPhone : (homelessesJson.personalPhone),
   contact : (homelessesJson.contact),
   formFiller: homelessesJson.formFiller,
   parentsAddress:homelessesJson.parentsAddress,
   referrer:homelessesJson.referrer,
   background: homelessesJson.background,
   psycoticPast:homelessesJson.psycoticPast ,
  addiction_History:homelessesJson.addiction_History ,
  criminalRecord:homelessesJson.criminalRecord,
  prominent_institutions: homelessesJson.prominent_institutions,
  sleepingPlace:homelessesJson.sleepingPlace,
  nameOf_prominent_institutions:homelessesJson.nameOf_prominent_institutions,
  therapeutic_history:homelessesJson.therapeutic_history ,

 });

 await setDoc(doc(firestore, "history",homelessesJson.id ), { 
   background: homelessesJson.background,  
   therapeutic_history:homelessesJson.therapeutic_history ,
   psycoticPast: homelessesJson.psycoticPast, 
   criminalRecord:homelessesJson.criminalRecord,
   addiction_History:homelessesJson.addiction_History
  //  prominent_institutions:homelessesJson.prominent_institutions
   });
  return await setDoc(doc(firestore, "inHomelesses",homelessesJson.id ), { 
    stage: homelessesJson.stage,
    room: (homelessesJson.room).toString(),
    date: homelessesJson.date,

    });
     
  };


export { getDetailsUserById, updateDetailsUserById ,createNewReportByIdDoc,getDetailsHomelessesById
  ,updateHomeless,getReportById,updateReportByIdDoc,getRoomNoAndStageForHomelessById,getReportByIdDoc}