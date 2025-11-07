// src/services/appointment.service.js
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "https://pethub-backend-rrpn.onrender.com/appointments";

// ✅ función auxiliar para obtener token y userId
const getAuthData = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token") ||
    localStorage.getItem("access_token");
  const userId =
    localStorage.getItem("userId") || localStorage.getItem("user_id");

  if (!token || !userId) {
    console.warn("Usuario no autenticado");
    return null; // ⚠️ no lanzamos error
  }

  return { token, userId };
};

// ✅ Crear una cita
export const createAppointment = async (appointment) => {
  try {
    const authData = getAuthData();
    if (!authData) throw new Error("Usuario no autenticado");

    const { token, userId } = authData;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      petId: Number(appointment.petId),
      ownerId: Number(userId),
      veterinarianId: appointment.veterinarianId || 1, // Ajustar según backend
      appointmentDate: new Date(
        `${appointment.date}T${appointment.time}`
      ).toISOString(),
      notes: appointment.notes || "Sin notas adicionales",
    };

    console.log("[createAppointment] payload:", payload);

    const response = await axios.post(
      `${BASE_URL}/createAppointment`,
      payload,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error creando cita:", error);

    Swal.fire({
      icon: "error",
      title: "Error al crear la cita",
      text:
        error?.response?.data?.message ||
        error.message ||
        "No se pudo crear la cita. Intenta nuevamente.",
      confirmButtonText: "Aceptar",
    });

    throw error;
  }
};

// ✅ Obtener todas las citas del usuario autenticado
export const getAllAppointmentsByUserId = async () => {
  const authData = getAuthData();
  if (!authData) return []; // ⚠️ Devuelve array vacío si no hay token

  try {
    const { token, userId } = authData;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BASE_URL}/getAllAppointmentsByUserId/${userId}`,
      { headers }
    );

    console.log("[getAllAppointmentsByUserId] Data:", response.data);

    return Array.isArray(response.data)
      ? response.data
      : response.data.appointments || [];
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return []; // ⚠️ Devuelve array vacío en caso de error
  }
};
