import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "./assets/image/LogoPetHub.png";

const RegisterPage = () => {
  const [isVet, setIsVet] = useState(false);
  const checkboxRef = useRef(null);

  useEffect(() => {
    checkboxRef.current.indeterminate = false;
  }, []);

  const handleCheckboxChange = () => {
    setIsVet(!isVet);
    checkboxRef.current.indeterminate = false;
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header
  className="d-flex justify-content-between align-items-center p-3 border-bottom"
  style={{ backgroundColor: "#d4edda" }}
>
  {/* Logo, nombre y slogan a la izquierda */}
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

  {/* Enlace a la derecha */}
  <div>
    <a href="/" className="text-decoration-underline text-dark small">
      Volver a la página principal
    </a>
  </div>
</header>


      <div className="container my-5">
        <div className="row shadow p-4 rounded mx-auto" style={{ maxWidth: "1000px" }}>
          <div className="col-md-6 border-end">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input type="text" className="form-control" placeholder="Ingrese aquí" />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input type="text" className="form-control" placeholder="Ingrese aquí" value/>
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
            </form>
          </div>

          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre mascota</label>
                <input type="text" className="form-control" placeholder="Ingrese aquí" />
              </div>

              <div className="mb-3">
                <label className="form-label">Especie</label>
                <input type="text" className="form-control" placeholder="Ingrese aquí" />
              </div>

              <div className="mb-3">
                <label className="form-label">Raza</label>
                <input type="text" className="form-control" placeholder="Ingrese aquí" />
              </div>

              <div className="mb-3">
                <label className="form-label">Edad</label>
                <input type="number" className="form-control" placeholder="Ingrese aquí" />
              </div>

              <div className="mb-3">
                <input type="file" className="btn btn-outline-secondary w-100"/>
              </div>

              <div className="mb-3">
                  Cargar historial médico
                <input type="file" className="btn btn-outline-secondary w-100"/>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-dark">
                  Crear una cuenta y perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
