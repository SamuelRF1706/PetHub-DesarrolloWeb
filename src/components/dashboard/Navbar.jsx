import { use, useEffect, useState } from "react"
import logo from '../../assets/LogoPetHub.png';

export const Navbar = ({logout}) => {

    const [name, setName] = useState('');

    useEffect(()=>{
        const name = localStorage.getItem("user_name" || "");
        setName(name);
    },[])

    return (
        <div className='d-flex justify-content-between align-items-center verdequeQuiero p-3 navbar-custom'>
        <div>
            <img src={logo} alt="logo" width="100px" className="cursor-pointer" />
        </div>
        <div className="d-flex align-items-center">
            <span className="greeting-icon me-3">👋</span>
            <div>
                <h3 className="mb-1 greeting-text">
                    <span className="greeting-highlight">¡Hola</span>, <span className="greeting-name">{name}</span>!
                </h3>
                <small className="greeting-subtitle">✨ Bienvenido de vuelta ✨</small>
            </div>
        </div>
        <div>
            <button className='btn btn-outline-light d-flex align-items-center' onClick={logout}>
                <svg 
                    className="me-2" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Cerrar sesión
            </button>
        </div>
        </div>
    )
}
