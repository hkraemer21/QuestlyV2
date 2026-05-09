import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNdEeLwBKuhHOAcZRYPcO1PI0shr1Y03k",
  authDomain: "questly-405ba.firebaseapp.com",
  projectId: "questly-405ba",
  storageBucket: "questly-405ba.firebasestorage.app",
  messagingSenderId: "22227363761",
  appId: "1:22227363761:web:5e09c454da74e31e337f90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export { db, auth, authProvider };