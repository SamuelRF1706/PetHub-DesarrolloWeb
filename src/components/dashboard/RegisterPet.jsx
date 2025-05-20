import { useState } from "react";
import Swal from "sweetalert2";
import { createNewPet, uploadImage } from "../../services/pet.service";

export const RegisterPet = ({back}) => {

    const [pet, setPet] = useState({});
    const [file, setFile] = useState(null);

    const crearMascota = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const url = await uploadImage(formData);
            await createNewPet({...pet, image: url });

            Swal.fire({
                icon: "success",
                text: "Mascota registrada",
                title: "La mascota ha sido registrada exitosamente.",
                confirmButtonText: "Aceptar",
            });
            setPet({});
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Error al registrar mascota",
                title: "Hubo un error registrando la mascota, contacta el administrador!",
                confirmButtonText: "Aceptar",
            });
        }
    };


  return (
    <div className="col-md-6 mx-auto my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="">Registrar Mascota</h4>
        <span className="text-primary text-decoration-underline cursor-pointer" onClick={back}>Volver</span>
      </div>
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
            onInput={(e)=>setFile(e.target.files[0])}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-dark">Registrar mascota</button>
        </div>
      </form>
    </div>
  )
}
