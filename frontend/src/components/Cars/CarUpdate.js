import React, { useState } from "react";
import { updateCar } from './CarServices'





export const CarUpdate = (props) => {

    const dataCar = ({ name, value }) => {
        props.set(name, value)
    }

    const sendData = () => {
        updateCar(props.carro)
    }

    const test = () => {
        console.log(props.carro)
    }

    return (
        <div>            
            <h1>ACTUALIZAR AUTO</h1>
            <br></br>
            <form>
                <div className="row">
                    <div className="col">
                        <input type="text"
                            className="form-control"
                            placeholder="Placa"
                            disabled
                            required
                            value={props.carro.Placa}
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Marca"
                            value={props.carro.Marca}
                            required
                            name="Marca"
                            onChange={(event) => dataCar(event.target)}
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Modelo"
                            value={props.carro.Modelo}
                            required
                            name="Modelo"
                            onChange={(event) => dataCar(event.target)}
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Serie"
                            value={props.carro.Serie}
                            required
                            name="Serie"
                            onChange={(event) => dataCar(event.target)}
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Color"
                            required
                            name="Color"
                            value={props.carro.Color}
                            onChange={(event) => dataCar(event.target)}
                        />
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-success mb-2"
                            onClick={sendData}>
                            Actualizar
                        </button>

                    </div>
                </div>
            </form>
            <hr></hr>
        </div>
    )

}

