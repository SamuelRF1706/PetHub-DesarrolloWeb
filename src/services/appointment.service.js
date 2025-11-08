import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../components/utils/firebase";
import axios from "axios";
import Swal from "sweetalert2";

const createAppointment = async (appointment) => {
    // Endpoint proporcionado por el usuario para crear citas
    const apiUrl = "https://pethub-backend-rrpn.onrender.com/appointments/createAppointment";
    try {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        // Construir el payload con los nombres exactos que espera el backend
        // petId, ownerId, veterinarianId, appointmentDate, notes
        let payload = {};
        // petId: preferir el valor numérico, si no, intentar mapear por nombre
        if (appointment.petId) {
            payload.petId = Number(appointment.petId);
        } else if (appointment.petName) {
            try {
                const { getAllPetsByUserId } = await import("./pet.service");
                const pets = await getAllPetsByUserId();
                const found = pets.find(p => (p.nombre || p.name || p.nombreMascota || p.petName) === appointment.petName);
                if (found) payload.petId = Number(found.id || found._id || found.petId);
            } catch (mapErr) {
                console.warn('[createAppointment] no se pudo mapear petName a petId:', mapErr);
            }
        }

        // ownerId: preferir el valor numérico, si no, tomar de localStorage
        if (appointment.ownerId) {
            payload.ownerId = Number(appointment.ownerId);
        } else {
            const ownerId = localStorage.getItem("user_id");
            if (ownerId) payload.ownerId = Number(ownerId);
        }

        // veterinarianId: si viene del form, usarlo; si no, dejarlo vacío o null
        if (appointment.veterinarianId) {
            payload.veterinarianId = Number(appointment.veterinarianId);
        }

        // appointmentDate: debe ser string ISO (ya lo es en el JSON de prueba)
        if (appointment.appointmentDate) {
            payload.appointmentDate = appointment.appointmentDate;
        } else if (appointment.date) {
            // Si el form usa "date" y "time" separados
            if (appointment.time) {
                // Unir date y time en formato ISO
                payload.appointmentDate = new Date(`${appointment.date}T${appointment.time}`).toISOString();
            } else {
                payload.appointmentDate = new Date(appointment.date).toISOString();
            }
        }

        // notes: opcional
        if (appointment.notes) {
            payload.notes = appointment.notes;
        } else if (appointment.descripcion) {
            payload.notes = appointment.descripcion;
        }

        // Log para depuración
        console.debug('[createAppointment] Payload enviado:', JSON.stringify(payload));

        const res = await axios.post(apiUrl, payload, { headers });
        return res.data;
    } catch (error) {
        console.error("Error creating appointment via API:", error?.response?.data || error.message || error);
        Swal.fire({
            icon: "error",
            title: "Error al crear cita",
            text: error?.response?.data?.message || "No se pudo crear la cita. Revisa la consola para más detalles.",
            confirmButtonText: "Aceptar",
        });
        throw error;
    }
};

const getAllAppointmentsByUserId = async () => {
    const user_id = localStorage.getItem("user_id");
    const appointmentsRef = collection(db, "users", user_id, "appointments");
    const querySnapshot = await getDocs(appointmentsRef);
    const appointmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return appointmentsData;
};

export const getAppointmentsForVet = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
        // Login as admin to get token
        const loginRes = await axios.post("https://pethub-backend-rrpn.onrender.com/users/login", {
            username: "admin",
            password: "admin123"
        });
        const token = loginRes?.data?.token;
        if (!token) return [];

        const res = await axios.get("https://pethub-backend-rrpn.onrender.com/appointments/getAllAppointments", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const all = Array.isArray(res.data) ? res.data : res.data?.appointments || [];
        const mine = all.filter(a => {
            const vetId = a.veterinarian?.idUser || a.veterinarianId || a.veterinarian?.id;
            const petId = a.pet?.id || a.petId || a.pet?._id;
            return String(vetId) === String(user_id);
        });

        // normalize fields
        return mine.map(a => ({
            id: a.id || a._id || a.appointmentId,
            service: a.service || a.tipo || a.tipoServicio || a.serviceName,
            petName: a.pet?.name || a.petName || a.petName || (a.pet && (a.pet.nombre || a.pet.name)),
            ownerName: a.owner?.fullName || a.owner?.name || a.ownerName || (a.owner && `${a.owner.name || ''} ${a.owner.lastName || ''}`.trim()),
            date: a.appointmentDate || a.date || a.fecha || a.scheduledDate,
            time: a.time || a.appointmentTime || (a.appointmentDate ? new Date(a.appointmentDate).toLocaleTimeString() : ''),
            raw: a
        }));
    } catch (error) {
        console.error('[getAppointmentsForVet] error:', error?.response?.data || error.message || error);
        return [];
    }
};

const getAppointmentsByDate = async (date) => {
    const user_id = localStorage.getItem("user_id");
    const appointmentsRef = collection(db, "users", user_id, "appointments");
    const q = query(appointmentsRef, where("date", "==", date));
    const querySnapshot = await getDocs(q);
    const appointmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return appointmentsData;
};

export {
    createAppointment,
    getAllAppointmentsByUserId,
    getAppointmentsByDate
};