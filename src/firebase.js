// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjuEOM1aRuHYUC4wmNfkZibZioolujrUQ",
  authDomain: "financio-pro.firebaseapp.com",
  projectId: "financio-pro",
  storageBucket: "financio-pro.firebasestorage.app",
  messagingSenderId: "479194206670",
  appId: "1:479194206670:web:6aa19fb56f049f25725b9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

export { auth };
