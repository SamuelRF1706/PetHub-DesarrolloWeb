import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { Menu } from "./Menu";
import { Navbar } from "./Navbar";

export const LayoutDasboard = ({ logout }) => {
  const [view, setView] = useState("pets"); // 👈 el estado global de la vista

  return (
    <div className="d-flex flex-column text-light h-100">
      <Navbar logout={logout} />
      <div className="flex-grow-1">
        <div className="row g-0 h-100">
          <div className="col-2">
            {/* ✅ ahora sí paso setView */}
            <Menu onChangeView={setView} />
          </div>
          <div className="col-10 h-100">
            {/* ✅ y paso el estado al dashboard */}
            <Dashboard view={view} setView={setView} />
          </div>
        </div>
      </div>
    </div>
  );
};
