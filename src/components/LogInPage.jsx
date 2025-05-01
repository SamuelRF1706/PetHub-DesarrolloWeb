import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "../assets/image/LogoPetHub.png";
import RegisterPage from "./RegisterPage";
import Session from "./Session";
import { db } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";
import { collection } from "firebase/firestore";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showSesion, setShowSesion] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const changeShowRegister = () => {
    setShowRegister(!showRegister);
  };

  const changeShowSession = () => {
    setShowSesion(!showSesion);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor complete todos los campos.");
      return;
    }
    console.log("Iniciando sesión con:", email, password);

    try {
      const usuariosRef = collection(db, "users"); // tu colección
      const q = query(usuariosRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0]?.data(); // Obtener el primer documento que coincida
      console.log(password, user.password)
      if (!user || user.password !== password) {	
        setError("Usuario o contraseña incorrectos.");
        return;

      }
      console.log("ENTRE")
      setError("");
      changeShowSession(); // Redirige a la página de sesión sin recargar
    } catch (error) {
      console.error(error); // Para ver más detalles en la consola
      if (error.code === "auth/user-not-found") {
        setError("El usuario no existe.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else {
        setError("Error al iniciar sesión.");
      }
    }
  };

  if (showRegister) {
    return <RegisterPage changeShowRegister={changeShowRegister} />;
  }

  if (showSesion) {
    return <Session changeShowSession={changeShowSession} />;
  }

  return (
    <div className="container vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <div className="row shadow p-4 rounded" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="col-md-6 text-center d-flex flex-column align-items-center justify-content-center border-end">
          <img 
            src={LogoPetHub}
            alt="Logo PetHub"
            className="img-fluid mb-3"
            style={{ maxHeight: "250px" }}
          />
          <div>
            <h5 className="mb-0">PetHub</h5>
            <small>Donde cada mascota tiene su espacio especial.</small>
          </div>
        </div>

        <div className="col-md-6 p-4">
          <form onSubmit={handleLogin}>
            <h4 className="mb-4 text-center">Iniciar sesión</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingrese email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingrese contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2 mb-3">
              <button type="submit" className="btn btn-dark">
                Iniciar sesión
              </button>
            </div>

            <div className="text-center mb-2">
              <a href="#" style={{ fontSize: "0.9rem" }}>¿Olvidó su contraseña?</a>
            </div>

            <div className="d-grid">
              <button type="button" className="btn btn-outline-dark" onClick={changeShowRegister}>
                Crear una cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
