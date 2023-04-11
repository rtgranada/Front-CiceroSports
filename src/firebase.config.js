import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRLMlqS3cDHf436FzRpaKxHYacCy-QDqw",
  authDomain: "cicerosports-64ec3.firebaseapp.com",
  projectId: "cicerosports-64ec3",
  storageBucket: "cicerosports-64ec3.appspot.com",
  messagingSenderId: "121028059925",
  appId: "1:121028059925:web:bf301f641a1731289a3f1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
