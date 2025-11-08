import { useEffect, useState } from "react";
import { getAllPetsByUserId } from "../../services/pet.service";
import { createAppointment } from "../../services/appointment.service";
import Swal from "sweetalert2";

export function Appointment({ back }) {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    petId: "",
    service: "",
    date: "",
    time: "",
  });
  const [loadingPets, setLoadingPets] = useState(true);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const data = await getAllPetsByUserId();
      setPets(data);
      console.log(data)
      if (data.length > 0) setFormData({ ...formData, petId: data[0].idPet });
    } catch (error) {
      console.error("Error cargando mascotas:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las mascotas",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoadingPets(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (!formData.petId || !formData.service || !formData.date || !formData.time) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    try {
      await createAppointment(formData);
      Swal.fire("Éxito", "Cita agendada correctamente", "success");
      back();
    } catch (error) {
      console.error("Error creando cita:", error);
      Swal.fire("Error", error.message || "No se pudo crear la cita", "error");
    }
  };

  if (loadingPets) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-center p-5 bg-white text-dark min-vh-50 rounded">
        <p>No tienes mascotas registradas. Debes agregar al menos una para agendar una cita.</p>
        <button className="btn btn-outline-dark" onClick={back}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white text-dark rounded shadow-sm min-vh-100 form-container fade-in-up">
      <h3 className="form-title mb-4">Agendar Cita</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Mascota</label>
          <select
            className="form-select"
            name="petId"
            value={formData.petId}
            onChange={handleChange}
          >
            {pets.map((pet) => (
              <option key={pet.idPet} value={pet.idPet}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de cita</label>
          <select
            className="form-select"
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Selecciona</option>
            <option value="Vacunación">Vacunación</option>
            <option value="Consulta">Consulta</option>
            <option value="Desparasitación">Desparasitación</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-outline-dark action-button" onClick={back}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-dark action-button">
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
}
