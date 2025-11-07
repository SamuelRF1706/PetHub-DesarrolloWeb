import { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

export const Login = ({ goToRegister, setView }) => {

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const login = async (user) => {
		try {
			const response = await axios.post(
				"https://pethub-backend-rrpn.onrender.com/login",
				user
			);

			// Suponiendo que el backend devuelve token, userId y role
			const { token, userId, role } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user_id", userId);
			localStorage.setItem("role", role);

			// Cambiamos la vista al dashboard
			setView("pets");
		} catch (error) {
			console.error("Error iniciando sesión:", error);
			Swal.fire({
				icon: "error",
				title: "Error al iniciar sesión",
				text: error?.response?.data?.message || "Credenciales incorrectas",
				confirmButtonText: "Aceptar",
			});
		}
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center h-100 p-0">
			<h4>PETHUB</h4>
			<div className="row w-100">
				<div className='mb-3'>
					<label htmlFor="email" className="form-label">Email:</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Ingrese email"
						value={user.email}
						onChange={(e) => setUser((user) => ({ ...user, email: e.target.value }))}
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor="password" className="form-label">Contraseña:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Ingrese contraseña"
						value={user.password}
						onChange={(e) => setUser((user) => ({ ...user, password: e.target.value }))}
					/>
					<span className='text-primary text-decoration-underline cursor-pointer'>Olvidé mi contraseña</span>
				</div>
				<div className='d-flex flex-column justify-content-center'>
					<button type='button' className='btn btn-primary' onClick={() => login(user)}>Iniciar sesión</button>
					<span className='text-primary text-decoration-underline cursor-pointer' onClick={goToRegister}>Aún no tengo cuenta</span>
				</div>
			</div>
		</div>
	)
}
