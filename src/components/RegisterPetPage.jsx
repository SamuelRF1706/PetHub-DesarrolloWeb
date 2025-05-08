import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, uploadFile } from "../firebase";
import LogoPetHub from "../assets/image/LogoPetHub.png";
import Session from "./Session";

function RegisterPetPage({ changeShowRegisterPet, userId, userName }) {
  const [pet, setPet] = useState({});
  const [showSession, setShowSession] = useState(false);

  const changeShowSession = () => {
    setShowSession(!showSession);
  };

  if (showSession) {
    return <Session changeShowSession={changeShowSession} userId={userId} />;
  }

  const crearMascota = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Error: No se ha identificado el usuario.");
      return;
    }

    if (!pet.image) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    try {
      // Subir la imagen a Firebase Storage
      // const imageUrl = await uploadFile(pet.image, userId);
      // console.log("Imagen subida correctamente:", imageUrl);

      await addDoc(collection(db, "users", userId, "pets"), {
        nombre: pet.nombre,
        especie: pet.especie,
        raza: pet.raza,
        edad: pet.edad
        // image: imageUrl
      });

      alert("Mascota registrada correctamente");
      setPet({});
    } catch (error) {
      console.error("Error al registrar mascota:", error);
      alert("Hubo un error al registrar la mascota.");
    }
  };

  return (
    <div className="col-md-6 mx-auto my-5">
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
          <a className="text-decoration-underline text-dark small" onClick={changeShowRegisterPet}>
            Volver a la página principal
          </a>
        </div>
      </header>

      <h4 className="mb-4">Registrar Mascota</h4>
      <form onSubmit={crearMascota}>
        <div className="mb-3">
          <label className="form-label">Nombre mascota</label>
          <input
            type="text"
            className="form-control"
            value={pet.nombre || ""}
            onChange={(e) => setPet({ ...pet, nombre: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Especie</label>
          <input
            type="text"
            className="form-control"
            value={pet.especie || ""}
            onChange={(e) => setPet({ ...pet, especie: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Raza</label>
          <input
            type="text"
            className="form-control"
            value={pet.raza || ""}
            onChange={(e) => setPet({ ...pet, raza: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            value={pet.edad || ""}
            onChange={(e) => setPet({ ...pet, edad: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen de la mascota</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPet({ ...pet, image: e.target.files[0] })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-dark">
            Registrar mascota
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPetPage;
