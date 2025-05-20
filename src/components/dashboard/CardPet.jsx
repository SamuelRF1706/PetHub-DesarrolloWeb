
export const CardPet = ({pet}) => {
  return (
    <div className="col-3 mt-4">
        <div className="mb-3" key={pet.id}>
            <div className="card">
                <img src={pet.image} className="card-img-top" alt="Mascota" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">{pet.nombre}</h5>
                            <div className="card-text">
                                <strong>Especie:</strong> {pet.especie} <br />
                                <strong>Raza:</strong> {pet.raza} <br />
                                <strong>Edad:</strong> {pet.edad} años
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-danger">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
