//* Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

//* Add the Web App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACExaSoj-tXRhMuKnJjh7ejuetYjJWSPs",
  authDomain: "adsjob-121f0.firebaseapp.com",
  projectId: "adsjob-121f0",
  storageBucket: "adsjob-121f0.firebasestorage.app",
  messagingSenderId: "481570716481",
  appId: "1:481570716481:web:465558df21853acc643fc0",
  measurementId: "G-11J2ED2KHD",
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
