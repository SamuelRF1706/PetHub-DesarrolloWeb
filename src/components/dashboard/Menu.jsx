export const Menu = ({ onChangeView }) => {
  const role = localStorage.getItem("role");
  const isVet = role === "VET";

  return (
    <div className="d-flex flex-column p-3 gap-3 h-100 bg-dark text-light">
      <div
        className="cursor-pointer border-bottom"
        onClick={() => onChangeView("account")}
      >
        <h4>Cuenta</h4>
      </div>
      
      {!isVet && (
        <div
          className="cursor-pointer border-bottom"
          onClick={() => onChangeView("pets")}
        >
          <h4>Mascotas</h4>
        </div>
      )}

      <div
        className="cursor-pointer border-bottom"
        onClick={() => onChangeView(isVet ? "vet-appointments" : "appointments")}
      >
        <h4>{isVet ? "Gestión de Citas" : "Mis Citas"}</h4>
      </div>

      {isVet && (
        <div
          className="cursor-pointer border-bottom"
          onClick={() => onChangeView("vet-panel")}
        >
          <h4>Panel Veterinario</h4>
        </div>
      )}

      {isVet && (
        <div
          className="cursor-pointer border-bottom"
          onClick={() => onChangeView("medical-records")}
        >
          <h4>Historiales Clínicos</h4>
        </div>
      )}
    </div>
  );
};
