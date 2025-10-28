import Swal from "sweetalert2";
import { db } from "../components/utils/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const login = async (email, password) => {
  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor ingrese su correo y contraseña!",
    });
    return false;
  }

  try {
    const usuariosRef = collection(db, "users");
    const q = query(usuariosRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    const user = docSnap?.data();

    if (!user || user.password !== password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo o contraseña incorrectos!",
      });
      return false;
    }

    // 🔹 Guardamos todos los datos del usuario
    localStorage.setItem("isAuthenticate", true);
    localStorage.setItem("user_name", `${user.name} ${user.lastName}`);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user_id", docSnap.id);

    // 🔹 Nuevas líneas para que AccountInfo muestre todo correctamente
    localStorage.setItem("first_name", user.name || "");
    localStorage.setItem("last_name", user.lastName || "");
    localStorage.setItem("email", user.email || "");

    return true;
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error iniciando sesión, contacta al administrador!",
    });
    return false;
  }
};

const logout = async () => {
  localStorage.removeItem("isAuthenticate");
  localStorage.clear();
  return true;
};

const isAuthenticated = () => {
  const isAuthenticate = localStorage.getItem("isAuthenticate");
  return isAuthenticate;
};

const checkEmailExists = async (email) => {
  try {
    const usuariosRef = collection(db, "users");
    const q = query(usuariosRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0;
  } catch (error) {
    console.error("Error verificando email:", error);
    throw error;
  }
};

const registerNewUser = async (user) => {
  if (user.password != user.password2) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden!",
    });
    return false;
  }

  try {
    const emailExists = await checkEmailExists(user.email);
    if (emailExists) {
      Swal.fire({
        icon: "error",
        title: "Email ya registrado",
        text: "Este correo electrónico ya está registrado en el sistema.",
      });
      return false;
    }
  } catch (error) {
    console.error("Error verificando email:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un error verificando el email, por favor intente nuevamente.",
    });
    return false;
  }

  const { password2, ...newUser } = user;

  try {
    await addDoc(collection(db, "users"), newUser);
    Swal.fire({
      icon: "success",
      title: "Usuario creado",
      text: "El usuario ha sido creado exitosamente.",
      confirmButtonText: "Aceptar",
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error creando el usuario, contacta al administrador!",
    });
  }
};

export { login, logout, isAuthenticated, registerNewUser, checkEmailExists };
