import { useState } from "react"
import { Login } from "./Login";
import { Register } from "./Register";
import logo from "../../assets/LogoPetHub.png"

export const LayoutAuth = ({login}) => {

    const [isRegister, setIsRegister] = useState(false);

    const handleChange = () => {
        setIsRegister(!isRegister);
    }


    return (
        <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row bg-light rounded-3 shadow-lg g-0">
                <div className="col-6">
                    <img src={logo} alt="" className="h-100 w-100 rounded-start" />
                </div>
                <div className="col-6">
                    {
                        !isRegister ? <Login goToRegister={handleChange} login={login} />:<Register goToLogin={handleChange} />
                    }
                </div>
            </div>
        </div>
    )
}
