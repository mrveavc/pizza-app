import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAd0Zz19zIq4XuMXUKC8hG7Vr337UwP_Fs",
  authDomain: "pizza-app-e0709.firebaseapp.com",
  projectId: "pizza-app-e0709",
  storageBucket: "pizza-app-e0709.appspot.com",
  messagingSenderId: "458761700059",
  appId: "1:458761700059:web:d59bfe862c20d3e41082fe"
  // apiKey: process.env.apiKey,
  // authDomain: process.authDomain,
  // projectId: process.env.projectId,
  // storageBucket: process.env.storageBucket,
  // messagingSenderId: process.env.messagingSenderId,
  // appId: process.env.appId
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);


export { app, auth ,db };
