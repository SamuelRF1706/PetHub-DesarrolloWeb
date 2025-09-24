import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 🔹 Variables desde .env
const apiKey = import.meta.env.VITE_FIREBASE_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET; // 👈 debe terminar en .appspot.com
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// 🔹 Configuración de Firebase
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Servicios principales
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

// 🔹 Analytics (solo si está disponible, evita errores en localhost)
let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Analytics no disponible en este entorno:", e.message);
  }
}

// 🔹 Función para subir archivos
export async function uploadFile(file, userId) {
  const storageRef = ref(storage, `users/${userId}/pets/${file.name}`);
  await uploadBytes(storageRef, file);
  const urlPhoto = await getDownloadURL(storageRef);
  return urlPhoto;
}

// Exportar servicios
export { auth, db, analytics };
