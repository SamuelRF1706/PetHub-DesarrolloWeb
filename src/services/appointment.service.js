import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../components/utils/firebase";

const createAppointment = async (appointment) => {
    const user_id = localStorage.getItem("user_id");
    await addDoc(collection(db, "users", user_id, "appointments"), appointment);
};

const getAllAppointmentsByUserId = async () => {
    const user_id = localStorage.getItem("user_id");
    const appointmentsRef = collection(db, "users", user_id, "appointments");
    const querySnapshot = await getDocs(appointmentsRef);
    const appointmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return appointmentsData;
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