import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../components/utils/firebase";
import axios from "axios";
import Swal from "sweetalert2";

const createNewPet = async (pet) => {
    try {
        // Login como admin para obtener token
        const loginRes = await axios.post("https://pethub-backend-rrpn.onrender.com/users/login", {
            username: "admin",
            password: "admin123"
        });
        const token = loginRes?.data?.token;
        if (!token) {
            throw new Error("No se pudo obtener token de admin");
        }

        const apiUrl = "https://pethub-backend-rrpn.onrender.com/pets/createPet";
        const headers = { "Content-Type": "application/json" };
        headers.Authorization = `Bearer ${token}`;

        // Construir payload con los nombres que el backend espera
        const ownerFromStorage = localStorage.getItem("user_id");
        const payload = {
            ownerId: ownerFromStorage ? Number(ownerFromStorage) : (pet.ownerId ? Number(pet.ownerId) : undefined),
            name: pet.name || pet.nombre || pet.petName || "",
            species: pet.species || pet.especie || pet.type || "",
            breed: pet.breed || pet.raza || "",
            birthDate: pet.birthDate || pet.birth_date || pet.fechaNacimiento || null,
        };

        // Log para depuración
        console.debug('[createNewPet] Payload enviado:', JSON.stringify(payload));
        console.debug('[createNewPet] Token usado:', token);

        const res = await axios.post(apiUrl, payload, { headers });
        return res.data;
    } catch (error) {
        console.error("Error creating pet via API:", error?.response?.data || error.message || error);
        Swal.fire({
            icon: "error",
            title: "Error al crear mascota",
            text: error?.response?.data?.message || "No se pudo crear la mascota. Revisa la consola para más detalles.",
            confirmButtonText: "Aceptar",
        });
        throw error;
    }
};

 /*const uploadImage = async (formData) => {
    const upload_preset= import.meta.env.VITE_UPLOAD_PRESET_NAME;
    const cloud_name= import.meta.env.VITE_CLOUD_NAME;
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    try {
        formData.append('upload_preset', upload_preset);
        formData.append('cloud_name', cloud_name);
        const res = await axios.post(apiUrl, formData);
        return res.data.secure_url; 
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: "Error al subir la imagen",
            title: "Hubo un error subiendo la imagen, contacta el administrador!",
            confirmButtonText: "Aceptar",
        });
    }
} */

const getAllPetsByUserId = async () => {
    const user_id = localStorage.getItem("user_id");
<<<<<<< HEAD
    const dataUserAdmin = await axios.post("https://pethub-backend-rrpn.onrender.com/users/login", {
        username: "admin",
        password: "admin123"
    });

    const token = dataUserAdmin.data.token;

    const allPets = await axios.get(`https://pethub-backend-rrpn.onrender.com/pets/getAllPets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    const myPets = allPets.data.filter((pet)=>pet.owner.idUser == user_id);
    return myPets;
=======
    try {
        // Login como admin para obtener token
        const loginRes = await axios.post("https://pethub-backend-rrpn.onrender.com/users/login", {
            username: "admin",
            password: "admin123",
            "Content-Type": "application/json"
        });
        const token = loginRes?.data?.token;
        console.debug('[getAllPetsByUserId] Token obtenido:', token);
        if (!token) {
            console.warn('[getAllPetsByUserId] no se obtuvo token del admin');
            return [];
        }

        const allPetsRes = await axios.get("https://pethub-backend-rrpn.onrender.com/pets/getAllPets", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const allPets = Array.isArray(allPetsRes.data) ? allPetsRes.data : allPetsRes.data?.pets || [];
        const myPets = allPets.filter((pet) => {
            // owner may be object with idUser
            const ownerId = pet.owner?.idUser || pet.owner?.id || pet.ownerId;
            return String(ownerId) === String(user_id);
        });
        return myPets;

    } catch (error) {
        console.error('[getAllPetsByUserId] error:', error?.response?.data || error.message || error);
        // Fallback: si falla, devolver array vacío
        return [];
    }
>>>>>>> new_dev
}


export { 
    createNewPet,
    getAllPetsByUserId
};
