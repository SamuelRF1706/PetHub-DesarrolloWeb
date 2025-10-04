import { PetsContainer } from "./PetsContainer";
import { AccountInfo } from "./AccountInfo";

export const Dashboard = ({ view, setView }) => {
  return (
    <div className="h-100 p-3 flex-grow-1">
      {view === "pets" && <PetsContainer />}
      {view === "account" && <AccountInfo back={() => setView("pets")} />}
    </div>
  );
};
