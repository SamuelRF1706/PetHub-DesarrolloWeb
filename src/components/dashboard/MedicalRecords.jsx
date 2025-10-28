import { useEffect, useState } from "react";
import { getMedicalHistory, addMedicalRecord } from "../../services/medical.service";
import Swal from "sweetalert2";

export const MedicalRecords = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchPet = async () => {
        if (!searchTerm) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor ingrese un ID de mascota",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        setLoading(true);
        try {
            const history = await getMedicalHistory(searchTerm);
            setMedicalHistory(history);
            setSelectedPet(searchTerm);
        } catch (error) {
            console.error("Error buscando historial:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo encontrar el historial médico",
                confirmButtonText: "Aceptar"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddRecord = async () => {
        if (!selectedPet) return;

        const { value: formValues } = await Swal.fire({
            title: "Agregar Registro Médico",
            html:
                '<select id="swal-type" class="swal2-input">' +
                '<option value="consultation">Consulta General</option>' +
                '<option value="vaccination">Vacunación</option>' +
                '<option value="surgery">Cirugía</option>' +
                '<option value="treatment">Tratamiento</option>' +
                '</select>' +
                '<textarea id="swal-diagnosis" class="swal2-textarea" placeholder="Diagnóstico"></textarea>' +
                '<textarea id="swal-treatment" class="swal2-textarea" placeholder="Tratamiento"></textarea>' +
                '<textarea id="swal-notes" class="swal2-textarea" placeholder="Notas adicionales"></textarea>',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    type: document.getElementById("swal-type").value,
                    diagnosis: document.getElementById("swal-diagnosis").value,
                    treatment: document.getElementById("swal-treatment").value,
                    notes: document.getElementById("swal-notes").value
                };
            },
            showCancelButton: true,
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar"
        });

        if (formValues) {
            try {
                await addMedicalRecord(selectedPet, formValues);
                const updatedHistory = await getMedicalHistory(selectedPet);
                setMedicalHistory(updatedHistory);
                Swal.fire({
                    icon: "success",
                    title: "Registro agregado",
                    text: "El registro médico ha sido agregado exitosamente"
                });
            } catch (error) {
                console.error("Error agregando registro:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo agregar el registro médico"
                });
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Historial Médico</h2>

            <div className="row mb-4">
                <div className="col-md-8">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese ID de la mascota"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary"
                            onClick={handleSearchPet}
                            disabled={loading}
                        >
                            {loading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                </div>
                {selectedPet && (
                    <div className="col-md-4">
                        <button 
                            className="btn btn-success w-100"
                            onClick={handleAddRecord}
                        >
                            Agregar Registro
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : selectedPet ? (
                medicalHistory.length === 0 ? (
                    <div className="text-center">
                        <p>No hay registros médicos para esta mascota</p>
                    </div>
                ) : (
                    <div className="timeline">
                        {medicalHistory.map((record, index) => (
                            <div key={record.id} className="card mb-3">
                                <div className="card-header">
                                    <strong>{new Date(record.date).toLocaleDateString()}</strong> - {
                                        record.type === "consultation" ? "Consulta General" :
                                        record.type === "vaccination" ? "Vacunación" :
                                        record.type === "surgery" ? "Cirugía" :
                                        "Tratamiento"
                                    }
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Diagnóstico</h5>
                                    <p className="card-text">{record.diagnosis}</p>
                                    
                                    <h5 className="card-title">Tratamiento</h5>
                                    <p className="card-text">{record.treatment}</p>
                                    
                                    {record.notes && (
                                        <>
                                            <h5 className="card-title">Notas Adicionales</h5>
                                            <p className="card-text">{record.notes}</p>
                                        </>
                                    )}
                                    
                                    <small className="text-muted">
                                        Atendido por: {record.vet_name}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : null}
        </div>
    );
};