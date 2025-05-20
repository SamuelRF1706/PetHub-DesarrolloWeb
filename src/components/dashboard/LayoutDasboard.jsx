import { Dashboard } from "./Dashboard"
import { Menu } from "./Menu"
import { Navbar } from "./Navbar"

export const LayoutDasboard = ({logout}) => {

    return (
        <div className="d-flex flex-column text-light h-100">
            <Navbar logout={logout} />
            <div className="flex-grow-1">
                <div className="row g-0 h-100">
                    <div className="col-2 ">
                        <Menu/>
                    </div>
                    <div className="col-10 h-100">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    )
}
