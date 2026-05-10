import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNdEeLwBKuhHOAcZRYPcO1PI0shr1Y03k",
  authDomain: "questly-405ba.firebaseapp.com",
  projectId: "questly-405ba",
  storageBucket: "questly-405ba.firebasestorage.app",
  messagingSenderId: "22227363761",
  appId: "1:22227363761:web:5e09c454da74e31e337f90"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export { db, auth, authProvider };