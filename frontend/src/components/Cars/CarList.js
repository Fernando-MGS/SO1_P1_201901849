import React, { useEffect, useState } from "react";
import * as carServices from './CarServices'
import 'bootswatch/dist/slate/bootstrap.min.css'
const CarList = (props) => {

    const [cars, setCars] = useState([])
    const initialState = {
        Placa: "",
        Marca: "",
        Modelo: null,
        Serie: "",
        Color: ""
    }
    const [actual, setActual] = useState(initialState)

    const loadCars = async () => {
        const res = await carServices.getCars()
        setCars(res.data)
    }

    const sendDelCar = (event, param) => {
        carServices.delCar(param)
    }

    const sendUpdateCar = (event, param) => {
        props.handle(param)
    }



    useEffect(() => {
        loadCars()
    }, [])

    return (
        <div className="container" id="registro">
            <br></br>
            <h1>AUTOS REGISTRADOS</h1>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Placa</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Color</th>
                        <th>Actualizar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>

                    {cars.map(car => {
                        /*const find =new RegExp(props.search)
                        let result = find.test(car.Marca)*/
                        let result = false
                        const find = new RegExp(props.search)
                        if (props.filter == 0) {
                            result = find.test(car.Marca)
                        } else if (props.filter == 1) {
                            result = find.test(car.Modelo)
                        } else {
                            result = find.test(car.Color)
                        }
                        if (result) {
                            return (
                                <tr key={car.Placa}>
                                    <td>{car.Placa}</td>
                                    <td>{car.Marca}</td>
                                    <td>{car.Modelo}</td>
                                    <td>{car.Serie}</td>
                                    <td>{car.Color}</td>
                                    <td scope="col"><button type="button" className="btn btn-success btn-sm" onClick={event => sendUpdateCar(event, car)}>↑</button></td>
                                    <td scope="col"><button type="button" className="btn btn-danger btn-sm" onClick={event => sendDelCar(event, car.Placa)}>x</button></td>
                                </tr>)
                        }
                    })}
                </tbody>
            </table>
            <hr />
        </div>
    )
}

export default CarList

