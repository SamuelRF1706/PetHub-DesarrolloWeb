import { useState } from 'react';

function RegisterPetPage() {
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
    <div className="col-md-6 mx-auto my-5">
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
          <label className="form-label">Foto</label>
          <input type="file" className="btn btn-outline-secondary w-100" />
        </div>

        <div className="mb-3">
          <label className="form-label">Cargar historial médico</label>
          <input type="file" className="btn btn-outline-secondary w-100" />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-dark">
            Crear una cuenta y perfil
          </button>
        </div>
      </form>
    </div>
    /</div>
  );
}

export default RegisterPetPage;