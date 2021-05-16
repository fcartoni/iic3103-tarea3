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
    console.log(nickname)
    console.log(mssgSent)
    return(
    <div >
        <h3>Chat</h3>
        <form onSubmit={getMssgs}>
            <p>Escribe algo:</p>
            <input align="center" type="text" value={mssgSent} onChange={e => setMssgSent(e.target.value)}></input>
            <input type="submit" value="Send"></input>
        </form>
        <div className="chat-box">
            {mssgChat.map(element => {
                if (element) { return (
                    <p>{element.date} <br></br>{element.name}: {element.message}</p>)
                }})}
        </div>
    </div>
    )};
export default Chat;
