import { useEffect, useState } from "react"
import { RegisterPet } from "./RegisterPet";
import { getAllPetsByUserId } from "../../services/pet.service";
import { CardPet } from "./CardPet";
import  Appointment  from "./Appointment "; // 👈 importa el formulario de citas

export const PetsContainer = () => {

    const [pets, setPets] = useState([]);
    const [newPetFlag, setNewPetFlag] = useState(false);
    const [newAppointmentFlag, setNewAppointmentFlag] = useState(false); // 👈 nuevo estado

    useEffect(() => {
        getPets();
    }, [])

    const getPets = async () => {
        const respPets = await getAllPetsByUserId();
        setPets(respPets);
    }

    const back = () => {
        setNewPetFlag(false);
        setNewAppointmentFlag(false); // 👈 reseteamos también citas
        getPets();
    }

    return (
        <div className="bg-light text-dark pt-3 ps-5 pe-5 overflow-auto h-100">
            {
                !newPetFlag && !newAppointmentFlag && <h1>Mis mascotas</h1>
            }
            {
                newPetFlag ? (
                    <RegisterPet back={back} />
                ) : newAppointmentFlag ? (
                    <Appointment />   /* 👈 mostramos el formulario de citas */
                ) : (
                    <div>
                        <button
                            className="btn btn-outline-dark me-2"
                            onClick={() => setNewPetFlag(true)}
                        >
                            Agregar mascota
                        </button>

                        <button
                            className="btn btn-outline-dark"
                            onClick={() => setNewAppointmentFlag(true)}
                        >
                            Agendar cita
                        </button>

                        <div className="row mt-3">
                            {
                                pets.length > 0 ?
                                    pets.map((pet) => (<CardPet pet={pet} key={pet.id} />)) :
                                    <h1 className="text-center">No tienes mascotas registradas</h1>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
