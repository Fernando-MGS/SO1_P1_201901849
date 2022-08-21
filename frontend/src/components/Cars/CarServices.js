import axios from 'axios'

export const getCars = async () => {
    return await axios.get('/getCars')
}

export const delCar = (placa) => {
    /*return async () => {
        return await axios.delete('http://backend:4000/deleteCar')
    }*/
    (async () => {
        const rawResponse = await fetch('/deleteCar', {
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
        return await axios.delete('http://backend:4000/deleteCar')
    }*/
    (async () => {
        const rawResponse = await fetch('/insertCar', {
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
        return await axios.delete('http://backend:4000/deleteCar')
    }*/
    (async () => {
        const rawResponse = await fetch('/updateCar', {
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
