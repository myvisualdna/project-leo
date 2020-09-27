function loginAction(result) {
  console.log(result);
  return {
    type: "SET_USER",
    payload: result,
  };
}

export default loginAction;
