// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Adicione esta linha

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP6mTJXJkiMJ886IAxG97vvLMeQrbQvDg",
  authDomain: "ecommerce-caee5.firebaseapp.com",
  projectId: "ecommerce-caee5",
  storageBucket: "ecommerce-caee5.appspot.com",
  messagingSenderId: "792712755572",
  appId: "1:792712755572:web:69359376c65ebe6b159421",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app); // Adicione esta linha
