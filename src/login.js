import React from "react";
import "./login.scss";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useDispatch } from "react-redux";
import LoginAction from "./redux/actions/loginAction";

function Login() {
  const dispatch = useDispatch();
  const LoginDispatch = (result) => dispatch(LoginAction(result));

  //Definimos el metodo para nuestro login con Google
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => LoginDispatch(result))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          width="130px"
          src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"
          alt="wpp-logo"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>

        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
