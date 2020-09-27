const initialState = {
  user: null,
};
//Defining initial state + action
const LoginReducer = (state = initialState, action) => {
  console.log(action.payload);
  //user will be filled by whaetever payload's action contains
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      console.log(state);
      return state;
  }
};

export default LoginReducer;
