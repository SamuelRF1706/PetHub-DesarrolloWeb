import Swal from "sweetalert2";
import axios from "axios";

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
  // Optional: backend may provide a check-email endpoint. For now, return false to let register attempt the POST
  // If you have an endpoint like /auth/check-email you can implement it here with axios.get
  return false;
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
    // Endpoint proporcionado por el usuario
    const apiUrl = "https://pethub-backend-rrpn.onrender.com/users/createUser";
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.post(apiUrl, newUser, { headers });
    Swal.fire({
      icon: "success",
      title: "Usuario creado",
      text: res.data?.message || "El usuario ha sido creado exitosamente.",
      confirmButtonText: "Aceptar",
    });
    return true;
  } catch (error) {
    console.error("Error creando usuario via API:", error?.response?.data || error.message || error);
    if (error?.response?.status === 409 || error?.response?.data?.message?.toLowerCase()?.includes("exist")) {
      Swal.fire({ icon: "error", title: "Email ya registrado", text: error.response.data?.message || "Este correo electrónico ya está registrado en el sistema." });
      return false;
    }
    Swal.fire({ icon: "error", title: "Oops...", text: error?.response?.data?.message || "Hubo un error creando el usuario, contacta al administrador!" });
    return false;
  }
};

export { login, logout, isAuthenticated, registerNewUser, checkEmailExists };
