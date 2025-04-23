import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "./assets/image/LogoPetHub.png";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [isVet, setIsVet] = useState(false);
  const checkboxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkboxRef.current.indeterminate = false;
  }, []);

  const handleCheckboxChange = () => {
    setIsVet(!isVet);
    checkboxRef.current.indeterminate = false;
  };

  const handleCreateAccount = () => {
    // Aquí podrías enviar los datos al backend si lo necesitas
    navigate("/registro-mascota");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header
        className="d-flex justify-content-between align-items-center p-3 border-bottom"
        style={{ backgroundColor: "#d4edda" }}
      >
        <div className="d-flex align-items-center">
          <img
            src={LogoPetHub}
            alt="Logo PetHub"
            style={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <div>
            <h5 className="mb-0 fw-bold">PetHub</h5>
            <small className="text-muted">Donde cada mascota tiene su espacio especial.</small>
          </div>
        </div>

        <div>
          <a href="/" className="text-decoration-underline text-dark small">
            Volver a la página principal
          </a>
        </div>
      </header>

      <div className="container my-5">
        <div className="row shadow p-4 rounded mx-auto" style={{ maxWidth: "1000px" }}>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <input type="text" className="form-control" placeholder="Ingrese aquí" />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input type="text" className="form-control" placeholder="Ingrese aquí" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Ingrese aquí" />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" placeholder="Ingrese aquí" />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkVeterinario"
                checked={isVet}
                onChange={handleCheckboxChange}
                ref={checkboxRef}
              />
              <label className="form-check-label" htmlFor="checkVeterinario">
                Veterinario
              </label>
            </div>

            <div className="d-grid">
              <button type="button" className="btn btn-dark" onClick={handleCreateAccount}>
                Crear una cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;