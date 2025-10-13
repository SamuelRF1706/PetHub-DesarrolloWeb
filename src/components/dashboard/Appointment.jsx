import React, { useState } from "react";
import { createAppointment } from "../../services/appointment.service";
import Swal from "sweetalert2";

const Appointment = ({ back }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    service: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAppointment(formData);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `Cita agendada para ${formData.petName} con ${formData.ownerName}`,
        confirmButtonText: "Aceptar"
      });
      setFormData({
        ownerName: "",
        petName: "",
        service: "",
        date: "",
        time: "",
      });
      back();
    } catch (error) {
      console.error("Error al agendar cita:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agendar la cita. Por favor, intente nuevamente.",
        confirmButtonText: "Aceptar"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agendar Cita</h2>
      <form
        className="border rounded p-4 shadow-sm bg-light"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Nombre del dueño</label>
          <input
            type="text"
            className="form-control"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre de la mascota</label>
          <input
            type="text"
            className="form-control"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
            placeholder="Ej: Firulais"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Servicio</label>
          <select
            className="form-select"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="consulta">Consulta General</option>
            <option value="vacunacion">Vacunación</option>
            <option value="desparasitacion">Desparasitación</option>
            <option value="control">Control Médico</option>
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
            required
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
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100 mb-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Agendando...
            </>
          ) : (
            "Agendar Cita"
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={back}
          disabled={loading}
        >
          ← Regresar
        </button>
      </form>
    </div>
  );
};

export default Appointment;
