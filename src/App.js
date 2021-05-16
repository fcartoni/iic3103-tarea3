import logo from './logo.svg';
import './App.css';
import "./components/listen.css";
import React, { useState, useEffect } from 'react';
import Map from './components/map';
import Chat from './components/chat';
import Flights from './components/flights';
const io = require("socket.io-client");


function App() {
  const [socket, setSocket] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const connect_socket = io("ws://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {path: '/flights'});
    setSocket(connect_socket)
  }, []);
  const getNickname = (username) => {
    if (username) {
      setNickname(username)
    }};
  const lista = [socket, nickname];
  const handleSubmit = (username) => {
    username.preventDefault();
    if (nickname!="") {
      setShowPage(true);
    }
    
  }
  console.log("showPage");
  console.log(showPage)
  return (
    <div>
      {socket?
        <div>
          { showPage? (
            <div className="main">
                <div className="map-info-container"><Map socket={socket}></Map></div>
                <div className="chat-container"><Chat lista={lista}></Chat></div>
            </div>
          )
        :
        ( <div className="nickname">
          <form className="form-container" onSubmit={nickname => {handleSubmit(nickname)}}>
            <div className="align">
            <p>Escribe tu Nickname:</p>
            <input align="center" type="text" value={nickname} onChange={nickname => getNickname((nickname.target.value))} ></input>
            <input className="button-info-flights" type="submit" value="Submit"></input>
            </div>
          </form>
          </div> )}
          

        </div> 
      :
        'Loading...'}

    </div>
  );
}

export default App;
