// src/services/appointment.service.js
import axios from "axios";
import Swal from "sweetalert2";
import { getAllPetsByUserId } from "./pet.service";

const BASE_URL = "https://pethub-backend-rrpn.onrender.com/appointments";

// ✅ función auxiliar para obtener token y userId
const getAuthData = async () => {
  // const token =
  //   localStorage.getItem("token") ||
  //   localStorage.getItem("auth_token") ||
  //   localStorage.getItem("access_token");
  const dataUserAdmin = await axios.post("https://pethub-backend-rrpn.onrender.com/users/login", {
        username: "admin",
        password: "admin123"
    });

    const token = dataUserAdmin.data.token;

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
    const authData = await getAuthData();
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
  const authData = await getAuthData();
  if (!authData) return []; // ⚠️ Devuelve array vacío si no hay token

  try {
    const { token, userId } = authData;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(authData)
    // const response = await axios.get(
    //   `${BASE_URL}/getAllAppointmentsByUserId/${userId}`,
    //   { headers }
    // );
    const response = await axios.get(
      `${BASE_URL}/getAllappointments`,
      { headers }
    );

    const myPets = await getAllPetsByUserId();
    console.log(myPets)
    return response.data.filter((appointment)=>{

      const date = new Date(appointment.appointmentDate);
      date.setHours(date.getHours() - 5);
      appointment.date = date.toISOString().split('T')[0];
      appointment.time = date.toISOString().split('T')[1].substring(0,5);

      const pet = myPets.find((pet)=> pet.idPet == appointment.petId);
      appointment.petName = pet ? pet.name : "Sin nombre";
      return appointment.ownerId == userId
    });
    
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return []; // ⚠️ Devuelve array vacío en caso de error
  }
};
