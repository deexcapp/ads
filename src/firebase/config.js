//* Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

//* Add the Web App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1AX214CyvxZm1yNAuG1ltUARxlE6JrDI",
  authDomain: "bleggs.firebaseapp.com",
  projectId: "bleggs",
  storageBucket: "bleggs.appspot.com",
  messagingSenderId: "982592525378",
  appId: "1:982592525378:web:edb383a55a03656fb089db",
  measurementId: "G-WC3ZVMSXE1",
};

//* Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//* Initialize Firebase Auth and set persistence
const auth = getAuth(firebase_app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Failed to set session persistence:", error);
  });

export { auth };
export default firebase_app; 
