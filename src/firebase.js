// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAU6rqG67-_S5uhMwdTD6cziIUDoT0blBo",
  authDomain: "pethub-a0459.firebaseapp.com",
  projectId: "pethub-a0459",
  storageBucket: "pethub-a0459.firebasestorage.app",
  messagingSenderId: "421694664421",
  appId: "1:421694664421:web:511514d45ef8d81f36ee0c",
  measurementId: "G-4CQGELWBC9"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Analytics (opcional)
const analytics = getAnalytics(app);

export { app, db, analytics };