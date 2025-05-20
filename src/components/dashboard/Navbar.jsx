import { use, useEffect, useState } from "react"
import logo from '../../assets/LogoPetHub.png';

export const Navbar = ({logout}) => {

    const [name, setName] = useState('');

    useEffect(()=>{
        const name = localStorage.getItem("user_name" || "");
        setName(name);
    },[])

    return (
        <div className='d-flex justify-content-between align-items-center bg-success p-3'>
        <div>
            {/* logo pethub */}
            <img src={logo} alt="logo" width="100px" />
        </div>
        <div>
            <h4>Hola, {name} bienvenido de vuelta</h4>
        </div>
        <div>
            <button className='btn btn-primary' onClick={logout}>Cerrar sesión</button>
        </div>
        </div>
    )
}
