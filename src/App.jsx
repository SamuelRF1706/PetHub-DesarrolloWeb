import { useState } from 'react';
import LoginPage from './components/LogInPage';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const initialPagination = {LoginPage: false, RegisterPage: false, RegisterPetPage: false};

  const [pagina, setPagina] = useState({...initialPagination, LoginPage: true});

  const cambiarPagina = (pagina) => { // register
    console.log("cambiar pagina", pagina);
    setPagina({...initialPagination, [pagina]: true});
  }
  return (
    <div>
      {/* mostrar pagina login */}
      {pagina.LoginPage && <LoginPage/>}
    
    </div>
  );
}

export default App;
