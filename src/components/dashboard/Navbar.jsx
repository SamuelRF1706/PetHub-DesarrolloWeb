import { use, useEffect, useState } from "react"

export const Navbar = ({logout}) => {

    const [name, setName] = useState('');

    useEffect(()=>{
        const name = localStorage.getItem("user_name" || "");
        setName(name);
    },[])

    return (
        <div className='d-flex justify-content-between align-items-center bg-success p-3'>
        <div>
            <h2>LOGO</h2>
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
