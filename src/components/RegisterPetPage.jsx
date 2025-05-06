import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Agregar Storage
import LogoPetHub from "../assets/image/LogoPetHub.png";

function RegisterPetPage({ userEmail }) {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [image, setImage] = useState(null); // Estado para la imagen
  const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de la imagen cargada

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Subir la imagen si se seleccionó
      let imageUrl = "";
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `pets/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Guardar datos de la mascota en Firestore
      await addDoc(collection(db, "pets"), {
        ownerName: userName,
        nombre,
        especie,
        raza,
        edad: Number(edad),
        imageUrl: imageUrl, // Guardar la URL de la imagen
      });

      alert("Mascota registrada correctamente. Recarga para ver los datos.");
    } catch (error) {
      console.error("Error al registrar mascota:", error);
    }
  };

  return (
    <div className="col-md-6 mx-auto my-5">
      <h4 className="mb-4">Registrar Mascota</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre mascota</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Especie</label>
          <input type="text" className="form-control" value={especie} onChange={(e) => setEspecie(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Raza</label>
          <input type="text" className="form-control" value={raza} onChange={(e) => setRaza(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input type="number" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} />
        </div>

        {/* Input para seleccionar la imagen */}
        <div className="mb-3">
          <label className="form-label">Imagen de la mascota</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-dark">Registrar mascota</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPetPage;
