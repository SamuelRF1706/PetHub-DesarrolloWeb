import { useState } from 'react'

export const Login = ({goToRegister, login}) => {

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

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
						onChange={(e) => setUser((user) => ({...user, email: e.target.value }))}
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
						onChange={(e) => setUser((user) => ({...user, password: e.target.value }))}
					/>
					<span className='text-primary text-decoration-underline cursor-pointer'>Olvide mi contraseña</span>
				</div>
				<div className='d-flex flex-column justify-content-center'>
					<button type='button' className='btn btn-primary' onClick={()=>login(user)}>Iniciar sesion</button>
					<span className='text-primary text-decoration-underline cursor-pointer' onClick={goToRegister}>Aun no tengo cuenta</span>
				</div>
			</div>
		</div>
	)
}
