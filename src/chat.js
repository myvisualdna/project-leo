import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, IconButton } from "@material-ui/core";
import "./chat.scss";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  //Selector for Login
  const loginSelector = useSelector((state) => state.LoginReducer.user);

  const [input, setInput] = useState("");

  //Difinimos en componente para el avatar y como cambiarlo
  const [seed, setSeed] = useState("");

  //Definimos el roomId para actualizar los mensajes
  const { roomId } = useParams();

  //Definimos roomName (nombre de la conversacion) y como cambiarlo
  const [roomName, setRoomName] = useState("");

  //Definimos los messages y como actualizarlos
  const [messages, setMessages] = useState([]);

  //Cada vez que el roomID cambia, vamos a correr una function que actualize los mensajes para ese roomId
  useEffect(() => {
    //Si el roomId cambia
    if (roomId) {
      //Vamos dentro de la collection "rooms"
      db.collection("rooms")
        //Vamos dentro de un documento especifico (el que indique el roomID en la URL)
        .doc(roomId)
        //Seteamos un live listener para esos cambios (los snapshots),
        //Cada snapshot modificara el roomName con la data que contiene ese snapshot (mas especificamente en el apartado name)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      //Ahora seteamos como vamos a leer la collection de mensajes en firebase
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  //Definimos el metodo que nos permite enviar mensajes (guardandolo dentro de input)
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: loginSelector?.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.adorable.io/avatars/285/abott@${Math.floor(
            Math.random() * 5000
          )}.png`}
        />
        <div className="chat__headerInfo">
          <h2>{roomName}</h2>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === loginSelector?.user.displayName &&
              "chat__receiver "
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a Message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
