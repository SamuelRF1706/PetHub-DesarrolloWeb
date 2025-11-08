import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllAppointmentsByUserId } from "../../services/appointment.service";
import { Appointment } from "./Appointment";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAppointmentFlag, setNewAppointmentFlag] = useState(false);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      if (!userId) throw new Error("Usuario no autenticado");

      const data = await getAllAppointmentsByUserId(userId);
      setAppointments(data);

      if (!data || data.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No hay citas",
          text: "No hay citas registradas para este usuario",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error cargando citas:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error.message ||
          "No se pudieron cargar las citas",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    setNewAppointmentFlag(false);
    loadAppointments();
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
        <div className="bg-light text-dark pt-3 ps-5 pe-5 overflow-auto h-100">
            <h2 className="text-center mb-4">Citas Agendadas</h2>

           
            {appointments.length === 0 ? (
                <div className="text-center">
                    <p>No hay citas agendadas</p>
                </div>


            ) : (
                <div className="row">
                    {appointments.map((appointment) => (
                        <div key={appointment.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{appointment.service}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        Mascota: {appointment.petName}
                                    </h6>
                                    <p className="card-text">
                                        <strong>Fecha:</strong> {formatDate(appointment.date)}
                                        <br />
                                        <strong>Hora:</strong> {appointment.time}
                                        <br />
                                        <strong>Dueño:</strong> {appointment.ownerName}
                                    </p>
                                    <div className="d-flex justify-content-end">
                                        <span className={`badge bg-${
                                            new Date(appointment.date) > new Date() 
                                                ? "primary" 
                                                : "secondary"
                                        }`}>
                                            {new Date(appointment.date) > new Date() 
                                                ? "Próxima" 
                                                : "Pasada"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
             
        </div>
   
    );
  }

  if (newAppointmentFlag) return <Appointment back={back} />;

  return (
    <div className="container-fluid bg-white text-dark h-100 p-4">
      <h2 className="text-center mb-4">Citas Agendadas</h2>

      <div className="text-end mb-3">
        <button className="btn btn-outline-dark" onClick={() => setNewAppointmentFlag(true)}>
          Agendar cita
        </button>
      </div>
     
      {appointments.length === 0 ? (
        <div className="text-center"><p>No hay citas agendadas</p></div>
      ) : (
        <div className="row">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{appointment.service}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Mascota: {appointment.petName}
                  </h6>
                  <p className="card-text">
                    <strong>Fecha:</strong> {formatDate(appointment.date)}<br/>
                       <strong>Veterinario:</strong> {appointment.veterinarianName}<br/>
                    <strong>Hora:</strong> {appointment.time}<br/>
                  </p>
                  <div className="d-flex justify-content-end">
                    <span className={`badge bg-${new Date(appointment.date) > new Date() ? "primary" : "secondary"}`}>
                      {new Date(appointment.date) > new Date() ? "Próxima" : "Pasada"}
                    </span>
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
