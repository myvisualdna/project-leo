import { combineReducers } from "redux";
import LoginReducer from "./loginReducer";

//El rootReducer va a ser la suma de todos los reducer combinados

const rootReducer = combineReducers({
  LoginReducer,
});

export default rootReducer;
