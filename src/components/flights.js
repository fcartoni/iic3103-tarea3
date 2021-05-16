import { useState, useEffect } from "react";


function Flights({socket}){
    const [infoFlights, setInfoFlights] = useState([]);
    useEffect(() => {
        socket.on("FLIGHTS", data => {
            setInfoFlights(data);
            }) 
    })
    const getFlights = () => {
        setInfoFlights([])
        socket.emit("FLIGHTS");        
        }
    return(
    <div>
        <button onClick={getFlights}>Información de Vuelos</button>
        <h3> Información de los vuelos: </h3>
        {infoFlights.map(element => {
        if (element) { return (
        <ul>
            <li> Código de vuelo: {element.code} </li>
            <li> Aerolínea: {element.airline}</li> 
            <li> Origen (lat, long): {element.origin} </li>
            <li> Destino (lat, long): {element.destination} </li>
            <li> Avión: {element.plane} </li>
            <li> Asientos: {element.seats} </li>
            <li> Pasajeros:
                     {element.passengers.map(pasajero => {
                        if (pasajero) { return (
                            <ul>
                                <li>Nombre: {pasajero.name}, Edad: {pasajero.age}</li>
                            </ul>
                        ) }
                    })}                
            </li>
        </ul>
        )
        }
        })}
    </div>
    )       
}
export default Flights;

