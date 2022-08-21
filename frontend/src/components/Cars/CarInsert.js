import React, { useState } from "react";
import {newCar} from './CarServices'

const CarInsert = () => {
    const initialState = {
        Placa: "",
        Marca: "",
        Modelo: "",
        Serie: "",
        Color: ""
    }
    const [data, setData] = useState(initialState)

    const dataCar = ({name,value})=>{
        if(name=="Marca"){
            const marca = value
            setData({
                Placa : data.Placa,
                Marca : marca,
                Modelo: data.Modelo,
                Serie: data.Serie,
                Color: data.Color
            })
        }else if(name=="Modelo"){
            const modelo = value
            setData({
                Placa : data.Placa,
                Marca : data.Marca,
                Modelo: parseFloat(modelo),
                Serie: data.Serie,
                Color: data.Color
            })
        }else if(name=="Serie"){
            const serie = value
            setData({
                Placa : data.Placa,
                Marca : data.Marca,
                Modelo: data.Modelo,
                Serie: serie,
                Color: data.Color
            })
        }else if(name=="Color"){
            const color = value
            setData({
                Placa : data.Placa,
                Marca : data.Marca,
                Modelo: data.Modelo,
                Serie: data.Serie,
                Color: color
            })
        }else if(name=="Placa"){
            const placa = value
            setData({
                Placa : placa,
                Marca : data.Marca,
                Modelo: data.Modelo,
                Serie: data.Serie,
                Color: data.color
            })
        }
    }

    const sendData = () =>{
        newCar(data)
    }

    return (
        <div id="insert">
            <h1>INGRESAR AUTO NUEVO</h1>
            <br></br>
            <form>
                <div className="row">
                    <div className="col">
                        <input type="text"
                            className="form-control"
                            placeholder="Placa"
                            required
                            autoComplete="off"
                            value={data.Placa}
                            name="Placa"
                            onChange={(event) => dataCar(event.target)}
                        />
                    </div>
                    <div className="col">
                        <input type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Marca"
                            value={data.Marca}
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
                            value={data.Modelo}
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
                            value={data.Serie}
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
                            value={data.Color}
                            onChange={(event) => dataCar(event.target)}
                        />
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-info mb-2"
                            onClick={sendData}>
                            Agregar
                        </button>

                    </div>
                </div>
            </form>
            <hr></hr>
        </div>
    )

}

export default CarInsert