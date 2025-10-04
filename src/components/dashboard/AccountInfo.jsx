import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../utils/firebase"; // 👈 tu config de firebase.js

const db = getFirestore(app);

export const AccountInfo = ({ back }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Datos básicos de Firebase Auth
      const basicInfo = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Sin nombre",
        photo: user.photoURL,
      };

      // Ahora intentamos traer más datos desde Firestore
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData({ ...basicInfo, ...docSnap.data() });
        } else {
          setUserData(basicInfo);
        }
      });
    }
  }, []);

  if (!userData) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="text-light p-3">
      <h2>Información de la cuenta</h2>
      <p><strong>UID:</strong> {userData.uid}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Nombre:</strong> {userData.name}</p>
      {userData.phone && <p><strong>Teléfono:</strong> {userData.phone}</p>}
      {userData.role && <p><strong>Rol:</strong> {userData.role}</p>}
      {userData.photo && (
        <img
          src={userData.photo}
          alt="Foto de perfil"
          className="rounded-circle"
          width={100}
        />
      )}

      <button className="btn btn-secondary mt-3" onClick={back}>
        Regresar
      </button>
    </div>
  );
};
