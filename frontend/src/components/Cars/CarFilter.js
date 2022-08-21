import React, {useState} from "react";


const CarFilter = (props) => {

    const [data, setData] = useState("")

    const tipoFiltro = ['Filtrar por marca', 'Filtrar por modelo', 'Filtrar por color']

    const setFilter = (value) => {
        props.filter(value)
    }

    
    const changeSearch = ({name, value}) => {
        let val = value
        props.search(val)
    }

    return (
        
        <div className="input-group mb-3">
        <div className="input-group-prepend">
        <div className="btn-group btn-group-toggle group-sm" role="group" aria-label="Basic example">
            <button type="button" onClick={event => setFilter(0)} className="btn btn-outline-warning ">Marca</button>
            <button type="button" onClick={event => setFilter(1)} className="btn btn-outline-success">Modelo</button>
            <button type="button" onClick={event => setFilter(2)} className="btn btn-outline-light">Color</button>
        </div>
        </div>
        <input type="text" 
            className="form-control" 
            placeholder={tipoFiltro[props.tipo]}
            aria-label="" 
            aria-describedby="basic-addon1"
            name="Field"
            id="Fields"
            onChange={(event) => changeSearch(event.target)}
            />
      </div>
    )
}

export default CarFilter