import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "../assets/image/LogoPetHub.png";
import RegisterPage from "./RegisterPage";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  const changeShowRegister = () => {
    setShowRegister(!showRegister);
  };

  if (showRegister) {
    return <RegisterPage changeShowRegister={changeShowRegister} />;
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
          <form>
            <h4 className="mb-4 text-center">Iniciar sesión</h4>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Ingrese email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Ingrese contraseña" />
            </div>

            <div className="d-grid gap-2 mb-3">
              <button type="submit" className="btn btn-dark">Iniciar sesión</button>
            </div>

            <div className="text-center mb-2">
              <a href="#" style={{ fontSize: "0.9rem" }}>¿Olvidó su contraseña?</a>
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setShowRegister(true)}
              >
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
