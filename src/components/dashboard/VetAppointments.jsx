import { useEffect, useState } from "react";
import { 
    getAllAppointmentsByUserId,
    //cancelAppointment,
   // rescheduleAppointment,
   // completeAppointment 
} from "../../services/appointment.service";
import Swal from "sweetalert2";

export const VetAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("pending"); // pending, completed, cancelled

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

    const handleCancel = async (appointmentId) => {
        const { value: reason } = await Swal.fire({
            title: "Razón de cancelación",
            input: "text",
            inputPlaceholder: "Ingrese la razón de la cancelación",
            showCancelButton: true,
            confirmButtonText: "Cancelar cita",
            cancelButtonText: "Volver",
            inputValidator: (value) => {
                if (!value) {
                    return "Debe ingresar una razón";
                }
            }
        });

        if (reason) {
            try {
                await cancelAppointment(appointmentId, reason);
                await loadAppointments();
                Swal.fire({
                    icon: "success",
                    title: "Cita cancelada",
                    text: "La cita ha sido cancelada exitosamente"
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo cancelar la cita"
                });
            }
        }
    };

    const handleReschedule = async (appointmentId) => {
        const { value: formValues } = await Swal.fire({
            title: "Reprogramar cita",
            html:
                '<input id="swal-date" class="swal2-input" type="date">' +
                '<input id="swal-time" class="swal2-input" type="time">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    date: document.getElementById("swal-date").value,
                    time: document.getElementById("swal-time").value
                };
            },
            showCancelButton: true,
            confirmButtonText: "Reprogramar",
            cancelButtonText: "Cancelar"
        });

        if (formValues && formValues.date && formValues.time) {
            try {
                await rescheduleAppointment(appointmentId, formValues.date, formValues.time);
                await loadAppointments();
                Swal.fire({
                    icon: "success",
                    title: "Cita reprogramada",
                    text: "La cita ha sido reprogramada exitosamente"
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo reprogramar la cita"
                });
            }
        }
    };

    const handleComplete = async (appointmentId) => {
        const { value: summary } = await Swal.fire({
            title: "Resumen de la consulta",
            input: "textarea",
            inputPlaceholder: "Ingrese el resumen de la consulta...",
            showCancelButton: true,
            confirmButtonText: "Completar cita",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return "Debe ingresar un resumen";
                }
            }
        });

        if (summary) {
            try {
                await completeAppointment(appointmentId, summary);
                await loadAppointments();
                Swal.fire({
                    icon: "success",
                    title: "Cita completada",
                    text: "La cita ha sido marcada como completada"
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo completar la cita"
                });
            }
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        if (filter === "pending") {
            return ["pending", "rescheduled"].includes(appointment.status);
        }
        return appointment.status === filter;
    });

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
            <h2 className="text-center mb-4">Gestión de Citas</h2>
            
            <div className="mb-4">
                <div className="btn-group" role="group">
                    <button 
                        className={`btn ${filter === "pending" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("pending")}
                    >
                        Pendientes
                    </button>
                    <button 
                        className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("completed")}
                    >
                        Completadas
                    </button>
                    <button 
                        className={`btn ${filter === "cancelled" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setFilter("cancelled")}
                    >
                        Canceladas
                    </button>
                </div>
            </div>

            {filteredAppointments.length === 0 ? (
                <div className="text-center">
                    <p>No hay citas {filter === "pending" ? "pendientes" : filter === "completed" ? "completadas" : "canceladas"}</p>
                </div>
            ) : (
                <div className="row">
                    {filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{appointment.service}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        Mascota: {appointment.petName}
                                    </h6>
                                    <p className="card-text">
                                        <strong>Fecha:</strong> {new Date(appointment.date).toLocaleDateString()}
                                        <br />
                                        <strong>Hora:</strong> {appointment.time}
                                        <br />
                                        <strong>Dueño:</strong> {appointment.ownerName}
                                    </p>
                                    
                                    {appointment.status === "pending" && (
                                        <div className="d-grid gap-2">
                                            <button 
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleComplete(appointment.id)}
                                            >
                                                Completar
                                            </button>
                                            <button 
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleReschedule(appointment.id)}
                                            >
                                                Reprogramar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleCancel(appointment.id)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    )}

                                    {appointment.status === "completed" && appointment.summary && (
                                        <div className="mt-2">
                                            <strong>Resumen:</strong>
                                            <p className="small">{appointment.summary}</p>
                                        </div>
                                    )}

                                    {appointment.status === "cancelled" && appointment.cancellation_reason && (
                                        <div className="mt-2">
                                            <strong>Razón de cancelación:</strong>
                                            <p className="small">{appointment.cancellation_reason}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};