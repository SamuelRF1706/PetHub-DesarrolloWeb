import React from "react";

const Session = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header
        className="d-flex justify-content-between align-items-center p-3 border-bottom"
        style={{ backgroundColor: "#d4edda" }}>
        <div className="d-flex align-items-center">
          <img src={LogoPetHub} alt="Logo PetHub" style={{ height: "60px", width: "60px", objectFit: "cover", marginRight: "10px",}}/>
          <div>
            <h5 className="mb-0 fw-bold">PetHub</h5>
            <small className="text-muted">Donde cada mascota tiene su espacio especial.</small>
          </div>
        </div>

        <div>
          <a className="text-decoration-underline text-dark small" onClick={changeShowRegister}>
            Volver a la página principal
          </a>
        </div>
      </header>

      
      
    </div>
  );
}
export default Session;
