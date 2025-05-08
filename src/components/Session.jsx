import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "../assets/image/LogoPetHub.png";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import RegisterPetPage from "./RegisterPetPage";

const Session = ({ changeShowSession, userName, userId }) => {
  const [showRegisterPet, setShowRegisterPet] = useState(false);
  const [pets, setPets] = useState([]);

  const changeShowRegisterPet = () => {
    setShowRegisterPet(!showRegisterPet);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsRef = collection(db, "users", userId, "pets");
        const querySnapshot = await getDocs(petsRef);
        const petsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPets(petsData);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      }
    };

    if (userId) {
      fetchPets();
    }
  }, [userId]);

  if (showRegisterPet) {
    return <RegisterPetPage changeShowRegisterPet={changeShowRegisterPet} userId={userId} />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{ backgroundColor: "#d4edda" }}>
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
          <a className="text-decoration-underline text-dark small" onClick={changeShowSession}>
            Cerrar sesión
          </a>
        </div>
      </header>

      <main className="container mt-4">
        <h2 className="text-center">¡Bienvenido, {userName}!</h2>
        
        {pets.length > 0 ? (
          <div className="row mt-4">
            {pets.map((pet) => (
              <div className="col-md-4 mb-3" key={pet.id}>
                <div className="card">
                  <img src={pet.image} className="card-img-top" alt="Mascota" style={{ height: "200px", objectFit: "cover" }} />
                  <div className="card-body">
                    <h5 className="card-title">{pet.nombre}</h5>
                    <p className="card-text">
                      <strong>Especie:</strong> {pet.especie} <br />
                      <strong>Raza:</strong> {pet.raza} <br />
                      <strong>Edad:</strong> {pet.edad} años
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">No tienes mascotas registradas aún.</p>
        )}

        <center>
          <button type="button" className="btn btn-primary mt-4" onClick={changeShowRegisterPet}>Agregar mascota</button>
        </center>
      </main>
    </div>
  );
};

export default Session;
