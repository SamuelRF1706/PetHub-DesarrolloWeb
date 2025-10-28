import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../components/utils/firebase";

const addMedicalRecord = async (petId, record) => {
    const user_id = localStorage.getItem("user_id");
    try {
        const petRef = doc(db, "users", user_id, "pets", petId);
        const petDoc = await getDoc(petRef);
        
        if (!petDoc.exists()) {
            throw new Error("Mascota no encontrada");
        }

        const medicalHistory = collection(petRef, "medical_history");
        await addDoc(medicalHistory, {
            ...record,
            date: new Date().toISOString(),
            vet_id: localStorage.getItem("user_id"),
            vet_name: localStorage.getItem("user_name")
        });

        return true;
    } catch (error) {
        console.error("Error adding medical record:", error);
        throw error;
    }
};

const getMedicalHistory = async (petId) => {
    const user_id = localStorage.getItem("user_id");
    try {
        const medicalHistory = collection(db, "users", user_id, "pets", petId, "medical_history");
        const querySnapshot = await getDocs(medicalHistory);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting medical history:", error);
        throw error;
    }
};

export {
    addMedicalRecord,
    getMedicalHistory
};