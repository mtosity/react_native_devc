import { combineReducers } from "redux";

getTodos = async () => {
  return await JSON.parse(await AsyncStorage.getItem("TODOS"));
};

const todosReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TODO":
      return [...state, ...action.payload];
    case "ASSIGN_TODOS":
      return action.payload;
    default:
      return state;
  }
};

const inputReducer = (state = "", action) => {
  switch (action.type) {
    case "ADD_INPUT":
      return action.payload;
      break;
    default:
      return state;
      break;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_TRUE":
      return true;
      break;
    case "SET_FALSE":
      return false;
      break;
    default:
      return false;
      break;
  }
};

export default combineReducers({
  todos: todosReducer,
  input: inputReducer,
  loading: loadingReducer
});
