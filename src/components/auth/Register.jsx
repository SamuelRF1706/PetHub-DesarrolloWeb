import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { registerNewUser } from '../../services/auth.service';
import { db } from "../utils/firebase"; // igual que en tu auth.service
import { doc, getDoc } from "firebase/firestore";

export const Register = ({goToLogin}) => {

	const [user, setUser] = useState({});

	const validarEmailUserExists = async (email) => { 
	

	}

	

	const createUser = async (e) => {
		
		const emailUser = localStorage.getItem("email") || localStorage.getItem("user_email") || localStorage.getItem("userEmail") || localStorage.getItem("correo") || "";
		if (email === emailUser) {
			Swal.fire({
				icon: "error",
				text: "El email ya está registrado",
				title: "Error",
				confirmButtonText: "Aceptar",
			});
			return;
		} else {
			e.preventDefault();
			registerNewUser({...user, role: "USER"})
			setUser({});
		}
		
	}
    return (
		<div className="d-flex flex-column justify-content-center align-items-center h-100 p-0">
			<h4>PETHUB</h4>
			<div className="row w-100">
				<div className="mb-3">
					<label className="form-label">Nombres</label>
					<input
						type="text"
						id="name"
						className="form-control"
						value={user.name || ""}
						onChange={(e) => setUser({ ...user, name: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Apellidos</label>
					<input
						type="text"
						id="lastName"
						className="form-control"
						value={user.lastName || ""}
						onChange={(e) => setUser({ ...user, lastName: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						id="email"
						className="form-control"
						value={user.email || ""}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Contraseña</label>
					<input
						type="password"
						id="password"
						className="form-control"
						value={user.password || ""}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
					/>
            	</div>
				<div className="mb-3">
					<label className="form-label">Confirme su contraseña</label>
					<input
						type="password"
						id="password2"
						className="form-control"
						value={user.password2 || ""}
						onChange={(e) => setUser({ ...user, password2: e.target.value })}
					/>
            	</div>
				<div className='d-flex flex-column justify-content-center'>
					<button className='btn btn-primary' onClick={createUser}>Registrarse</button>
					<span className='text-primary text-decoration-underline cursor-pointer' onClick={goToLogin}>Ya tengo cuenta</span>
				</div>
			</div>
		</div>
	)
}
