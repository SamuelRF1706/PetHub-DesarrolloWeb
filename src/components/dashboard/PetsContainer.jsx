import { useEffect, useState } from "react"
import { RegisterPet } from "./RegisterPet";
import { getAllPetsByUserId } from "../../services/pet.service";
import { CardPet } from "./CardPet";

export const PetsContainer = () => {

    const [pets, setPets] = useState([]);
    const [newPetFlag, setNewPetFlag] = useState(false);

    useEffect(()=>{
        getPets();
    },[])

    const getPets = async () => {
        const respPets = await getAllPetsByUserId();
        setPets(respPets);
    }

    const back = () => {
        setNewPetFlag(false);
        getPets();
    }

    return (
        <div className="bg-light text-dark pt-3 ps-5 pe-5 overflow-auto h-100" >
            {
                !newPetFlag && <h1>Mis mascotas</h1>
            }
            {
                newPetFlag ? 
                <RegisterPet back={back} />:
                <div>
                    <button className="btn btn-primary" onClick={() => setNewPetFlag(true)}>Agregar mascota</button>
                    <div className="row mt-3">
                        {
                            pets.length > 0 ?
                            pets.map((pet) => ( <CardPet pet={pet} key={pet.id} />)) :
                            <h1 className="text-center">No tienes mascotas registradas</h1>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
