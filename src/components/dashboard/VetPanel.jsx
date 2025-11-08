import { useEffect, useState } from "react";
import { getAllAppointmentsByUserId } from "../../services/appointment.service";
import Swal from "sweetalert2";

export const VetPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllAppointmentsByUserId();
        setAppointments(data || []);
      } catch (error) {
        console.error("Error cargando citas para panel vet:", error);
        Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar las citas" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const noop = (action) => {
    Swal.fire({ icon: "info", title: "Acción en desarrollo", text: `${action} — funcionalidad pendiente.` });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Panel Veterinario</h2>
      {appointments.length === 0 ? (
        <div className="text-center">
          <p>No tienes citas asignadas</p>
        </div>
      ) : (
        <div className="row">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{appointment.service || appointment.tipo || "Servicio"}</h5>
                  <p className="card-text">
                    <strong>Mascota:</strong> {appointment.petName || appointment.pet || appointment.petName}
                    <br />
                    <strong>Dueño:</strong> {appointment.ownerName || appointment.owner}
                    <br />
                    <strong>Fecha:</strong> {appointment.date}
                    <br />
                    <strong>Hora:</strong> {appointment.time}
                  </p>

                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => noop('Completar')}>Completar</button>
                    <button className="btn btn-warning btn-sm" onClick={() => noop('Reprogramar')}>Reprogramar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => noop('Cancelar')}>Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VetPanel;
