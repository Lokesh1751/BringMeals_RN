// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkKRmZlpwmhsUZhafjg5IFpLW9KvuGMjM",
  authDomain: "bringmeals-7c4ba.firebaseapp.com",
  projectId: "bringmeals-7c4ba",
  storageBucket: "bringmeals-7c4ba.appspot.com",
  messagingSenderId: "1054587078664",
  appId: "1:1054587078664:web:b3bfd66cd80238c4c8a9bd"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB=getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH= getAuth(FIREBASE_APP)