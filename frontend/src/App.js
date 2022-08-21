import './App.css';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CarList from './components/Cars/CarList';
import CarInsert from './components/Cars/CarInsert';
import {CarUpdate} from './components/Cars/CarUpdate';
import CarFilter from './components/Cars/CarFilter'


function App() {
  const [initial, setInitial] = useState({
    Placa: "",
    Marca: "",
    Modelo: "",
    Serie: "",
    Color: ""
  })

  const [filter, setFilter] = useState(0)

  const [search, setSearch] = useState("")

  const handleInitialChanger=(select)=>{
    setInitial(select)
  }

  const data_Initial = (name,value) => {
    if(name=="Marca"){
        const marca = value
        setInitial({
            Placa : initial.Placa,
            Marca : marca,
            Modelo: initial.Modelo,
            Serie: initial.Serie,
            Color: initial.Color
        })
    }else if(name=="Modelo"){
        const modelo = value
        setInitial({
            Placa : initial.Placa,
            Marca : initial.Marca,
            Modelo: parseFloat(modelo),
            Serie: initial.Serie,
            Color: initial.Color
        })
    }else if(name=="Serie"){
        const serie = value
        setInitial({
            Placa : initial.Placa,
            Marca : initial.Marca,
            Modelo: initial.Modelo,
            Serie: serie,
            Color: initial.Color
        })
    }else if(name=="Color"){
        const color = value
        setInitial({
            Placa : initial.Placa,
            Marca : initial.Marca,
            Modelo: initial.Modelo,
            Serie: initial.Serie,
            Color: color
        })
    }
}

  const optionFilter = (type) => {
    setFilter(type)
  }

  


  return (
    <div className="App container">
      <br></br>
      <CarFilter filter={optionFilter} tipo={filter} search={setSearch}/>
      <CarList handle={handleInitialChanger}  filter={filter} search={search} />
      <CarInsert />
      <CarUpdate carro={initial} handle={handleInitialChanger} set={data_Initial}/>
    </div>
  );
}

export default App;
