//Importamos el metodo creador de store + middleware
import { createStore, applyMiddleware } from "redux";
//Importamos thunk para controlar el middleware
import thunk from "redux-thunk";
//importamos la herramienta que nos permite ver el state en el browser
import { composeWithDevTools } from "redux-devtools-extension";
//importamos el rootReducer que combina todos los reducers
import rootReducer from "../reducers";

//Definimos un state inicial vacio
const initialState = {};
//Definimos que thunk va a ser el middleware a utilizar
const middleware = [thunk];

//Creamos el store, combinando todos los elementos anteriores
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
