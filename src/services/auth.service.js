import Swal from "sweetalert2";
import axios from "axios";
import bcrypt from "bcryptjs";
// Nota: esta función usa un endpoint temporal que devuelve todos los usuarios.
// Comparar contraseñas en el cliente es inseguro y debe reemplazarse por un endpoint
// de autenticación seguro (POST /auth/login) en producción.

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
    const apiUrl = "https://pethub-backend-rrpn.onrender.com/users/getAllUsers";
    const res = await axios.get(apiUrl);
    const users = Array.isArray(res.data) ? res.data : res.data?.users || [];

    const user = users.find((u) => (u.email || u.mail || u.username || u.emailAddress) === email);
    if (!user) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Correo o contraseña incorrectos!" });
      return false;
    }

    // comparar password con passwordHash usando bcryptjs
    const hash = user.passwordHash || user.password || user.password_hash || user.pass;
    const passwordMatches = hash ? bcrypt.compareSync(password, hash) : false;
    if (!passwordMatches) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Correo o contraseña incorrectos!" });
      return false;
    }

    // Guardar información en localStorage siguiendo la estructura del endpoint
    localStorage.setItem("isAuthenticate", true);
    localStorage.setItem("user_name", user.fullName || user.fullname || `${user.firstName || ''} ${user.lastName || ''}`.trim());
    // Guardar el id del rol (2 = VET)
    localStorage.setItem("role", user.role?.idRole || user.roleId || "1");
    localStorage.setItem("user_id", user.idUser || user.id || user._id || "");
    // guardar campos individuales para AccountInfo
    const full = user.fullName || user.fullname || user.fullname || "";
    if (full) {
      const parts = full.split(/\s+/);
      localStorage.setItem("first_name", parts[0] || "");
      localStorage.setItem("last_name", parts.slice(1).join(" ") || "");
    } else {
      localStorage.setItem("first_name", user.firstName || user.name || "");
      localStorage.setItem("last_name", user.lastName || "");
    }
    localStorage.setItem("email", user.email || user.mail || "");

    return true;
  } catch (error) {
    console.error("Error iniciando sesión via API:", error?.response?.data || error.message || error);
    Swal.fire({ icon: "error", title: "Oops...", text: "Hubo un error iniciando sesión, contacta al administrador!" });
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
  // El backend espera fullName (N mayúscula) y roleId: 1
  const first = (user.name || "").trim();
  const last = (user.lastName || "").trim();
  newUser.fullName = `${first} ${last}`.trim();
  newUser.roleId = 1;
  // Elimina fullname si existe por error
  if (newUser.fullname) delete newUser.fullname;

  try {
    // Endpoint proporcionado por el usuario
    const apiUrl = "https://pethub-backend-rrpn.onrender.com/users/createUser";
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token") || "";
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Log para depuración
    console.debug('[registerNewUser] Payload enviado:', JSON.stringify(newUser));

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

const getAllUsers = async () => {
  try {
    const apiUrl = "https://pethub-backend-rrpn.onrender.com/users/getAllUsers";
    const res = await axios.get(apiUrl);

    return res.data;
  } catch (error) {
    console.log("Error obteniendo usuarios:", error);
  }
}

export { login, logout, isAuthenticated, registerNewUser, checkEmailExists, getAllUsers };
