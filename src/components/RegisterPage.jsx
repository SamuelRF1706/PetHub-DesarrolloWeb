import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoPetHub from "../assets/image/LogoPetHub.png";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const RegisterPage = ({changeShowRegister}) => {
  const [isVet, setIsVet] = useState(false);
  const checkboxRef = useRef(null);
  const [user, setUser] = useState({});
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("users", users);
      setUser(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    console.log("guardando usuario", user);
    await addDoc(collection(db, "users"), user);
    fetchUsers();
    setUser({});
    
  };

  useEffect(() => {
    checkboxRef.current.indeterminate = false;
  }, []);

  const handleCheckboxChange = () => {
    setIsVet(!isVet);
    checkboxRef.current.indeterminate = false;
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header
        className="d-flex justify-content-between align-items-center p-3 border-bottom"
        style={{ backgroundColor: "#d4edda" }}
      >
        <div className="d-flex align-items-center">
          <img
            src={LogoPetHub}
            alt="Logo PetHub"
            style={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <div>
            <h5 className="mb-0 fw-bold">PetHub</h5>
            <small className="text-muted">Donde cada mascota tiene su espacio especial.</small>
          </div>
        </div>

        <div>
          <a className="text-decoration-underline text-dark small" onClick={changeShowRegister}>
            Volver a la página principal
          </a>
        </div>
      </header>

      <div className="container my-5">
        <div className="row shadow p-4 rounded mx-auto" style={{ maxWidth: "1000px" }}>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <input type="text" id = "name" className="form-control" placeholder="Ingrese aquí" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input type="text" id = "lastName" className="form-control" placeholder="Ingrese aquí" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" id = "email" className="form-control" placeholder="Ingrese aquí" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" id = "password" className="form-control" placeholder="Ingrese aquí" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkVeterinario"
                checked={isVet}
                onChange={handleCheckboxChange}
                ref={checkboxRef}
              />
              <label className="form-check-label" htmlFor="checkVeterinario">
                Veterinario
              </label>
            </div>

            <div className="d-grid">
              <button type="button" className="btn btn-dark" onClick={crearUsuario}>
                Crear una cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;