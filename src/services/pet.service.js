import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../components/utils/firebase";
import axios from "axios";
import Swal from "sweetalert2";

const createNewPet = async (pet) => {
    // Endpoint proporcionado por el usuario
    const apiUrl = "https://pethub-backend-rrpn.onrender.com/pets/createPet";
    try {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await axios.post(apiUrl, pet, { headers });
        // "Quemar" token en el cliente: eliminarlo de localStorage después de usarlo
        try {
            if (token) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("token");
                console.debug('[createNewPet] token removed from localStorage');
            }
        } catch (rmErr) {
            console.warn('[createNewPet] failed to remove token:', rmErr);
        }
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

const uploadImage = async (formData) => {
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
}

const getAllPetsByUserId = async () => {
    const user_id = localStorage.getItem("user_id");
    const petsRef = collection(db, "users", user_id, "pets");
    const querySnapshot = await getDocs(petsRef);
    const petsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return petsData;
}


export { 
    createNewPet,
    uploadImage,
    getAllPetsByUserId
};
