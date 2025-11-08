import { useEffect, useState } from "react";
import { db } from "../utils/firebase"; // igual que en tu auth.service
import { doc, getDoc } from "firebase/firestore";

export const AccountInfo = ({ back }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "Sin nombre",
    lastName: "Sin apellido",
    email: "Sin correo",
    role: "Sin rol",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const readLocal = () => {
      // varias claves posibles para compatibilidad
      const fullName = localStorage.getItem("user_name") || localStorage.getItem("name") || localStorage.getItem("first_name") || "";
      const firstName = localStorage.getItem("first_name") || "";
      const lastName = localStorage.getItem("last_name") || localStorage.getItem("user_lastName") || "";
      const email = localStorage.getItem("email") || localStorage.getItem("user_email") || localStorage.getItem("userEmail") || localStorage.getItem("correo") || "";
      const role = localStorage.getItem("role") || localStorage.getItem("user_role") || "";
      const userId = localStorage.getItem("user_id") || localStorage.getItem("userId") || localStorage.getItem("user_id");

      // derive name/lastname if needed
      let nameVal = firstName || "";
      let lastVal = lastName || "";
      if (!firstName && fullName) {
        const parts = fullName.trim().split(/\s+/);
        if (parts.length > 1) {
          nameVal = parts[0];
          lastVal = parts.slice(1).join(" ");
        } else {
          nameVal = fullName;
        }
      }

      return { nameVal, lastVal, email, role, userId };
    };

    (async () => {
      try {
        const local = readLocal();

        // Si ya tenemos email y apellido local, mostramos eso
        if (local.email && (local.lastVal || local.nameVal)) {
          setUserData({
            name: local.nameVal || "Sin nombre",
            lastName: local.lastVal || "Sin apellido",
            email: local.email || "Sin correo",
            role: local.role || "Sin rol",
          });
          setLoading(false);
          return;
        }

        // Si falta algo e existe user_id -> leer Firestore por doc id
        if (local.userId) {
          const docRef = doc(db, "users", local.userId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const d = snap.data();
            setUserData({
              name: d.name || local.nameVal || "Sin nombre",
              lastName: d.lastName || local.lastVal || "Sin apellido",
              email: d.email || local.email || "Sin correo",
              role: d.role || local.role || "Sin rol",
            });
            setLoading(false);
            return;
          }
        }

        // Intento final: si hay algún email local aun si no hay apellido
        setUserData({
          name: local.nameVal || "Sin nombre",
          lastName: local.lastVal || "Sin apellido",
          email: local.email || "Sin correo",
          role: local.role || "Sin rol",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error cargando AccountInfo:", err);
        setError("Error cargando datos del usuario");
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-light text-dark pt-3 ps-5 pe-5 overflow-auto h-100">
        <div className="account-info-container fade-in-up">
              <h2 className="section-title text-center">Información de la cuenta</h2>
              <div className="account-info-item">
                <span className="account-info-label">Nombre:</span>
                <span className="account-info-value">{userData.name}</span>
              </div>
              <div className="account-info-item">
                <span className="account-info-label">Apellido:</span>
                <span className="account-info-value">{userData.lastName}</span>
              </div>
              <div className="account-info-item">
                <span className="account-info-label">Correo electrónico:</span>
                <span className="account-info-value">{userData.email}</span>
              </div>
              <div className="account-info-item">
                <span className="account-info-label">Rol:</span>
                <span className="account-info-value">{userData.role}</span>
              </div>
         
      {back && (
        <div className="text-center mt-4">
          <button className="btn btn-secondary action-button" onClick={back}>
            Regresar
          </button>
        </div>
      )}
      </div>
    </div>
  );
};
