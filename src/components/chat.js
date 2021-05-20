import { useState, useEffect } from "react";
import "./listen.css";

function Chat({lista}) {
    const socket = lista[0];
    const nickname = lista[1];
    const [mssgChat, setMssgChat] = useState([]);
    const [mssgSent, setMssgSent] = useState("");
    useEffect(() => {
        socket.emit("CHAT");
        socket.on("CHAT", (data) => {
            setMssgChat((prev)=>[...prev, data]);
            })
    }, []);
    const getMssgs = (evt) => {
        evt.preventDefault();
        socket.emit("CHAT", {"name": nickname, "message": mssgSent});     
        setMssgSent("")
        };
    return(
    <div >
        <h3 className="color-font">Centro de Control</h3>
        <form className="form-container" onSubmit={getMssgs}>
            <p>Escribe algo:</p>
            <input align="center" type="text" value={mssgSent} onChange={e => setMssgSent(e.target.value)}></input>
            <input className="button-chat" type="submit" value="Send"></input>
        </form>
        <div className="chat-box">
            {mssgChat.map(element => {
                if (element) { return (
                    <p>{Date(element.date)} <br></br>{element.name}: {element.message}</p>)
                }})}
        </div>
    </div>
    )};
export default Chat;
