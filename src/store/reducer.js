const InitializeState = {
  Counter: 8,
};
const reducer = (state = InitializeState, action) => {
  switch (action.type) {
    case "COUNT":
      return {
        Counter: state.Counter - 1,
      };

    case "RESETCOUNTER":
      let counter = 8;
      return {
        Counter: counter,
      };
  }
  return state;
};
export default reducer;
