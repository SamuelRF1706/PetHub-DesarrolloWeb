export const Menu = ({ onChangeView, currentView = "pets" }) => {
  const roleId = Number(localStorage.getItem("role") || "1");
  const isVet = roleId === 2; // id 2 = VET

  const handleItemClick = (view) => {
    onChangeView(view);
  };

  return (
    <div className="d-flex flex-column h-100 bg-dark text-light menu-custom">
      <div className="menu-header p-4">
        <h5 className="menu-title mb-0">Menú</h5>
        <div className="menu-divider"></div>
      </div>
      
      <div className="flex-grow-1 px-3 py-2">
        <div
          className={`cursor-pointer menu-item ${currentView === "account" ? "active" : ""}`}
          onClick={() => handleItemClick("account")}
        >
          <span className="menu-icon">👤</span>
          <span className="menu-text">Cuenta</span>
        </div>
        
        {!isVet && (
          <div
            className={`cursor-pointer menu-item ${currentView === "pets" ? "active" : ""}`}
            onClick={() => handleItemClick("pets")}
          >
            <span className="menu-icon">🐾</span>
            <span className="menu-text">Mascotas</span>
          </div>
        )}

        <div
          className={`cursor-pointer menu-item ${currentView === (isVet ? "vet-appointments" : "appointments") ? "active" : ""}`}
          onClick={() => handleItemClick(isVet ? "vet-appointments" : "appointments")}
        >
          <span className="menu-icon">📅</span>
          <span className="menu-text">{isVet ? "Gestión de Citas" : "Mis Citas"}</span>
        </div>

        {isVet && (
          <div
            className={`cursor-pointer menu-item ${currentView === "vet-panel" ? "active" : ""}`}
            onClick={() => handleItemClick("vet-panel")}
          >
            <span className="menu-icon">🏥</span>
            <span className="menu-text">Panel Veterinario</span>
          </div>
        )}

        {isVet && (
          <div
            className={`cursor-pointer menu-item ${currentView === "medical-records" ? "active" : ""}`}
            onClick={() => handleItemClick("medical-records")}
          >
            <span className="menu-icon">📋</span>
            <span className="menu-text">Historiales Clínicos</span>
          </div>
        )}
      </div>
    </div>
  );
};
