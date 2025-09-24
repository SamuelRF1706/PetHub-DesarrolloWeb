// src/components/Appointment.jsx
import React, { useState } from "react";

const Appointment = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    service: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cita agendada para ${formData.petName} con ${formData.ownerName}`);
    setFormData({
      ownerName: "",
      petName: "",
      service: "",
      date: "",
      time: "",
    });
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

        <button type="submit" className="btn btn-primary w-100">
          Agendar Cita
        </button>
      </form>
    </div>
  );
};

export default Appointment;
