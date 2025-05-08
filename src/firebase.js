import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUctcCf4qAQjv1IqtI1HDCcQ1CBgy5CwQ",
  authDomain: "pethub-desarrollo-ccfab.firebaseapp.com",
  projectId: "pethub-desarrollo-ccfab",
  storageBucket: "pethub-desarrollo-ccfab.appspot.com",
  messagingSenderId: "1031837147438",
  appId: "1:1031837147438:web:a9fe114766f685494d9abf",
  measurementId: "G-N4ZQX03RBR"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export async function uploadFile(file, userId) {
  const storageRef = ref(storage, `users/${userId}/pets/${file.name}`);

  await uploadBytes(storageRef, file);
  const urlPhoto = await getDownloadURL(storageRef);
  return urlPhoto;
  
}

export { auth, db, analytics };
