import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import RegisterPetPage from './RegisterPetPage';
import LoginPage from './LogInPage';

function App() {
  return (
    <div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/crear-cuenta" element={<RegisterPage />} />
        <Route path="/registro-mascota" element={<RegisterPetPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
