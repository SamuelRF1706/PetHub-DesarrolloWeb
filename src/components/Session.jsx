import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "../assets/image/LogoPetHub.png";
import RegisterPetPage from "./RegisterPetPage";

const Session = ({ changeShowSession }) => {
  const [showRegisterPet, setShowRegisterPet] = useState(false);
  const changeShowRegisterPet = () => {
    setShowRegisterPet(!showRegisterPet);
  };

if (showRegisterPet) {
  return <RegisterPetPage changeShowRegisterPet={changeShowRegisterPet} />;
  }
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header
        className="d-flex justify-content-between align-items-center p-3 border-bottom"
        style={{ backgroundColor: "#d4edda" }}>
        <div className="d-flex align-items-center">
          <img 
            src={LogoPetHub} 
            alt="Logo PetHub" 
            style={{ height: "60px", width: "60px", objectFit: "cover", marginRight: "10px" }}
          />
          <div>
            <h5 className="mb-0 fw-bold">PetHub</h5>
            <small className="text-muted">Donde cada mascota tiene su espacio especial.</small>
          </div>
        </div>

        <div>
          <a 
            className="text-decoration-underline text-dark small" 
            onClick={changeShowSession}>
            Volver a la página principal
          </a>
        </div>
      </header>
      
      <main className="container mt-4">
        <h2 className="text-center">¡Bienvenido a tu sesión!</h2>
        {/* Aquí puedes agregar más contenido de la sesión */}
        <button onClick={changeShowRegisterPet}>Agregar mascota</button>

      </main>
    </div>
  );
};

export default Session;
