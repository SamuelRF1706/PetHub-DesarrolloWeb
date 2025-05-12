import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

const SessionVet = ({ changeShowSession }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllPets = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const allPets = [];

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();
        const userPetsRef = collection(db, "users", userId, "pets");
        const userPetsSnapshot = await getDocs(userPetsRef);

        userPetsSnapshot.forEach((petDoc) => {
          const petData = petDoc.data();
          allPets.push({
            id: petDoc.id,
            nombre: petData.nombre,
            especie: petData.especie,
            raza: petData.raza,
            edad: petData.edad,
            ownerName: `${userData.name} ${userData.lastName}`,
            ownerEmail: userData.email,
          });
        });
      }

      setPets(allPets);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5">Cargando mascotas...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mascotas Registradas</h2>

      <div className="input-group mb-4">
        <span className="input-group-text" id="search-icon">
          🔍
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre de mascota"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar mascota"
          aria-describedby="search-icon"
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Dueño</th>
            <th>Email del Dueño</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.nombre}</td>
                <td>{pet.especie}</td>
                <td>{pet.raza}</td>
                <td>{pet.edad}</td>
                <td>{pet.ownerName}</td>
                <td>{pet.ownerEmail}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No se encontraron mascotas.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn btn-outline-dark mt-4" onClick={() => changeShowSession("")}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default SessionVet;
