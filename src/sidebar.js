import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./sidebar.scss";
import SidebarChat from "./sidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import db from "./firebase";

function Sidebar() {
  //Selector for Login
  const loginSelector = useSelector((state) => state.LoginReducer.user);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    //db.collection(nombreDeLaCollection).onSnapshoot..........
    //Significa que va a estar atento a los cambios dentro de esa collection (los snapshoots son fotos de esos cambios). Cada cambio una foto nueva, y se hace update
    //Por cada nuevo snapshot disparamos el siguiente codigo
    const unsuscribe = db.collection("rooms").onSnapshot((snapshot) =>
      //SetRooms se va a actualizar con cada snapshot nuevo. Docs se refiere a la lista de elementos dentro de la collection (mapeamos y creamos por cada snapshot un objeto con Id + data).
      setRooms(
        snapshot.docs.map((doc) => ({
          //Por cada snpashot retornamos un nuevo objeto que consiste en un id (que es el id de cada doc, ahora llamado RoomId) + data
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={loginSelector?.user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search to start a new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          //A sidebarChat le vamos a pasar la data que leimos de la database: ahora id sera igual a la roomId leida de la database + name (la data que contiene dentro esa id).
          //Name es el nombre de la conversacion/contacto
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
