import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { registerNewUser } from '../../services/auth.service';
import { db } from "../utils/firebase"; // igual que en tu auth.service
import { doc, getDoc } from "firebase/firestore";

export const Register = ({goToLogin}) => {

	const [user, setUser] = useState({});

	const [loading, setLoading] = useState(false);

	const createUser = async (e) => {
		e.preventDefault();
		if (!user.email || !user.password || !user.password2 || !user.name || !user.lastName) {
			Swal.fire({
				icon: "error",
				title: "Campos incompletos",
				text: "Por favor complete todos los campos del formulario.",
				confirmButtonText: "Aceptar"
			});
			return;
		}

		setLoading(true);
		try {
			const success = await registerNewUser({...user, role: "USER"});
			if (success !== false) {
				setUser({});
				goToLogin();
			}
		} catch (error) {
			console.error("Error en registro:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Hubo un error durante el registro. Por favor intente nuevamente.",
				confirmButtonText: "Aceptar"
			});
		} finally {
			setLoading(false);
		}
	}
    return (
		<div className="d-flex flex-column justify-content-center align-items-center h-100 p-0">
			<h4 className="auth-title mb-4">PETHUB</h4>
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
				<div className='d-flex flex-column justify-content-center gap-3'>
					<button 
						className='btn btn-primary btn-lg' 
						onClick={createUser}
						disabled={loading}
					>
						{loading ? (
							<>
								<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
								Registrando...
							</>
						) : (
							"Registrarse"
						)}
					</button>
					<span className='text-primary text-decoration-underline cursor-pointer' onClick={goToLogin}>Ya tengo cuenta</span>
				</div>
			</div>
		</div>
	)
}
