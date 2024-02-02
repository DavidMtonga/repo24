import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQRtJBEe_z8eQSs_S7X7mhHUX6Bj1EWUA",
  authDomain: "retaila-9fbe3.firebaseapp.com",
  projectId: "retaila-9fbe3",
  storageBucket: "retaila-9fbe3.appspot.com",
  messagingSenderId: "583902410622",
  appId: "1:583902410622:web:396aea4bd7fa341a9ae52f",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();