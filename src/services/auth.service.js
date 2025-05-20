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

        localStorage.setItem('isAuthenticate', true)
        localStorage.setItem('user_name', `${user.name} ${user.lastName}`);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user_id', docSnap.id);
        return true;
        
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error iniciando sesion, contacta el administrador!',
        })
        return false;
    }
}

const logout = async () => {

    localStorage.removeItem('isAuthenticate');
    localStorage.clear()
    return true
}

const isAuthenticated = () => {
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    return isAuthenticate;
}

const registerNewUser = async (user) => {
    
    if(user.password != user.password2){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden!',
        })
        return;
    }
    const {password2, ...newUser} = user;

    
    
    try {
        await addDoc(collection(db, "users"), newUser);
        Swal.fire({ 
            icon: "success",
            title: "Usuario creado",
            text: "El usuario ha sido creado exitosamente.",
            confirmButtonText: "Aceptar",
        });
        
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error creando el usuario, contacta el administrador!',
        })
    }

}

export {
    login,
    logout,
    isAuthenticated,
    registerNewUser
}