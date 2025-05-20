import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { LayoutDasboard } from "./components/dashboard/LayoutDasboard";
import { LayoutAuth } from "./components/auth/LayoutAuth";
import { isAuthenticated, login, logout } from "./services/auth.service";

function App() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsLogin(isAuthenticated());
    }, [])

    const handleLogin = async ({email, password}) => {
        const isValid = await login(email, password);
        setIsLogin(isValid);
    }

    const handleLogout = () => {
        logout();
        setIsLogin(false);
    }

    return (
        <div className="bg-dark vh-100 d-flex flex-column">
            {
                !isLogin ? <LayoutAuth login={handleLogin} /> : <LayoutDasboard logout={handleLogout}/>
            }
        </div>
    )
}

export default App;
