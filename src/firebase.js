import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
  apiKey: "AIzaSyAd0Zz19zIq4XuMXUKC8hG7Vr337UwP_Fs",
  authDomain: "pizza-app-e0709.firebaseapp.com",
  projectId: "pizza-app-e0709",
  storageBucket: "pizza-app-e0709.appspot.com",
  messagingSenderId: "458761700059",
  appId: "1:458761700059:web:d59bfe862c20d3e41082fe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
