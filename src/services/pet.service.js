import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../components/utils/firebase";
import axios from "axios";
import Swal from "sweetalert2";

const createNewPet = async (pet) => {

    const user_id = localStorage.getItem("user_id");
    await addDoc(collection(db, "users", user_id, "pets"), pet);
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
