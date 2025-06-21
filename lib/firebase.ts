import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh9BGbVd52C794JIe3pEUMHEqkYFVo40w",
  authDomain: "m-project-b4fba.firebaseapp.com",
  projectId: "m-project-b4fba",
  storageBucket: "m-project-b4fba.appspot.com",
  messagingSenderId: "721631485098",
  appId: "1:721631485098:web:de2f5a332d8838c650c4d3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
