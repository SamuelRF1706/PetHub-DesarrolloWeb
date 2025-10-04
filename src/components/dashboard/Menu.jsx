export const Menu = ({ onChangeView }) => {
  return (
    <div className="d-flex flex-column p-3 gap-3 h-100 bg-dark text-light">
      <div
        className="cursor-pointer border-bottom"
        onClick={() => onChangeView("account")}
      >
        <h4>Cuenta</h4>
      </div>
      <div
        className="cursor-pointer border-bottom"
        onClick={() => onChangeView("pets")}
      >
        <h4>Mascotas</h4>
      </div>
    </div>
  );
};
