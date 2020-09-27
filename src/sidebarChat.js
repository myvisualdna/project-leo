import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./sidebarChat.scss";
import db from "./firebase";
import { Link } from "react-router-dom";

//Desde Sidebar recibimos informacion leida desde la database: cada id de la collections "rooms", mas el "name" que sera el nombre de la conversacion
//El id srive especialmente para el router, para cambiar de conversaciones
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  //Definimos los messages y como actualizarlos
  const [messages, setMessages] = useState([]);

  //Definimos la renderizacion de los mensajes dentro de la sidebar
  //Si me pasas una ID, buscare dentro de la collection "rooms", y dentro de ella buscare dentro de los doc con esa misma ID, recolectare los mensajes (ordenamos por time).
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
          //Una vez idenfiticados los mensajes, los inyectare dentro del stata "messages" ordenados desde el mas reciente primero
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    //Definimos el elemento roomName (nombre de la conversacion), que se definira por lo que introducimos
    const roomName = prompt("Please enter name for chat");

    //Si introducimos un roomName, vamos a añadir a la collection "rooms" un nuevo elemento, cuyo parametro name sera lo que introducimos en el prompt anterior
    if (roomName) {
      //EN la collection rooms, añadimos un nuevo elemento con la propiedad name que sera igual a roomName
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://api.adorable.io/avatars/285/abott@${seed}.png`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
