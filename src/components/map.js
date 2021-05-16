import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./map.css";
import "./listen.css";
import {Icon} from 'leaflet';
import airplane from"../images/airplane.png";

const io = require("socket.io-client");

const markerIcon = new Icon({
    iconUrl: airplane,
    iconSize: [30, 15]
})

function Map({socket}) {
  const [infoFlights, setInfoFlights] = useState([]);
  //const [line, setLine] = useState([]);
  const purpleOptions = { color: 'purple' };
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    socket.on("POSITION", data => {
        setAllPositions((prev)=>[...prev, data]);
        //setLine([[-33.382761, -70.803203], [-34.82264, -58.533321]]);
        })
    socket.on("FLIGHTS", data => {
      setInfoFlights(data);
      }) 
    ///return () => socket.disconnect();
    
  }, []);
  const getFlights = () => {
    setInfoFlights([])
    socket.emit("FLIGHTS");        
    }

  return (
    <div>
        <h2>Mapa en vivo</h2>
        <p> <MapContainer center={[-33.4513, -70.6653]} zoom={1} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
            {infoFlights.map(info => {
              if (info) { return (
                  <Polyline pathOptions={purpleOptions} positions={[info.origin, info.destination]} />
              )}
            }
              )}
            
            {allPositions.map(element => {
              if (element) { return (
                <Marker position={element.position} icon={markerIcon}>
                    <Popup code={element.code}>
                    <code positionCode={element.code}>{element.code}</code>
                    </Popup>
                </Marker> )
            }
            })};
            </MapContainer> </p>
            <button onClick={getFlights} className='button-info-flights'>Información de Vuelos</button>
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
    
  );

    
}

export default Map;