import { PetsContainer } from "./PetsContainer";
import { AccountInfo } from "./AccountInfo";
import { AppointmentList } from "./AppointmentList";
import { VetAppointments } from "./VetAppointments";
import { VetPanel } from "./VetPanel";
import { MedicalRecords } from "./MedicalRecords";

export const Dashboard = ({ view, setView }) => {
  return (
    <div className="h-100 p-3 flex-grow-1">
      {view === "pets" && <PetsContainer />}
      {view === "account" && <AccountInfo back={() => setView("pets")} />}
      {view === "appointments" && <AppointmentList />}
  {view === "vet-appointments" && <VetAppointments />}
  {view === "vet-panel" && <VetPanel />}
      {view === "medical-records" && <MedicalRecords />}
    </div>
  );
};
