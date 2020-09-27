import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import "./sidebar";
import Sidebar from "./sidebar";
import Chat from "./chat";
import HomeScreen from "./homeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./login";
import { useDispatch } from "react-redux";
import LoginAction from "./redux/actions/loginAction";

function App() {
  //Para el login, definmos user
  const [user, setUser] = useState(null);

  //Selector for Login
  const loginSelector = useSelector((state) => state.LoginReducer.user);

  return (
    <div className="app">
      {!loginSelector ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
