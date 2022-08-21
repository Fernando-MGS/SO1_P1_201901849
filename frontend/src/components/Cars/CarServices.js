import axios from 'axios'

export const getCars = async () => {
    return await axios.get('http://localhost:4000/getCars')
}

export const delCar = (placa) => {
    /*return async () => {
        return await axios.delete('http://localhost:4000/deleteCar')
    }*/
    (async () => {
        const rawResponse = await fetch('http://localhost:4000/deleteCar', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Placa: placa}) 
        });
        
        const content = await rawResponse.json();
      })();
}

export const newCar = (data) => {
    /*return async () => {
        return await axios.delete('http://localhost:4000/deleteCar')
    }*/
    (async () => {
        const rawResponse = await fetch('http://localhost:4000/insertCar', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        const content = await rawResponse.json();
      })();
}

export const updateCar = (data) => {
    /*return async () => {
        return await axios.delete('http://localhost:4000/deleteCar')
    }*/
    (async () => {
        const rawResponse = await fetch('http://localhost:4000/updateCar', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        const content = await rawResponse.json();
      })();
}
