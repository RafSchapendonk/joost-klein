// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqfKAqAv0tGN2tYE-mTugH_T1rQZG0Uh8",
    authDomain: "joost-klein-droom-groot.firebaseapp.com",
    projectId: "joost-klein-droom-groot",
    storageBucket: "joost-klein-droom-groot.appspot.com",
    messagingSenderId: "179538313758",
    appId: "1:179538313758:web:c3a0a412cdd95acf1ee40f",
    measurementId: "G-9212LVKD74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);