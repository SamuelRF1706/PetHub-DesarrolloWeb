import { useEffect, useState } from "react";
import { getAllAppointmentsByUserId } from "../../services/appointment.service";
import Swal from "sweetalert2";

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const data = await getAllAppointmentsByUserId();
            setAppointments(data);
        } catch (error) {
            console.error("Error cargando citas:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar las citas",
                confirmButtonText: "Aceptar"
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
};