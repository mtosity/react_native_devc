export const addTodo = newTodo => {
    return{
  type: "ADD_TODO",
  payload: newTodo
}};

export const addInput = newInput => {
    return{
    type: "ADD_INPUT",
    payload: newInput
}};

export const setLoadingFalse = () => {
    return{
    type: "SET_FALSE"
}};

export const setLoadingTrue = () => {
    return{
    type: "SET_TRUE"
}};

export const assignTodos = (newTodoList) => {
    return{
        type: "ASSIGN_TODOS",
        payload: newTodoList
    }
}
