import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addTodo, assignTodos, addInput, setLoadingFalse, setLoadingTrue} from '../TodosActions'

import Constants from "expo-constants";
import TodoItem from "../components/TodoItem";

import { TODOS } from "../utils/data.js";

class AllScreen extends Component {
  constructor(props) {
    super(props);
    
  }

  async componentDidMount() {

    setLoadingTrue();

    const oldTodos = await JSON.parse(await AsyncStorage.getItem("TODOS"));
    //console.log(oldTodos);
    //console.log('did');
    if (oldTodos) {
      console.log(oldTodos);
      this.props.addTodo(oldTodos);
    }

    setLoadingFalse();
  }

  onToggleTodo = id => {
    const todo = this.props.todos.find(todo => todo.id === id);
    todo.status = todo.status === "Done" ? "Active" : "Done";

    
    newTodoList = [...this.props.todos];
    newTodoList = newTodoList.filter(todo => todo.id != id);
    newTodoList.push(todo);
    this.props.assignTodos(newTodoList);
  };

  onDeleteTodo = async id => {
    const newTodoList = this.props.todos.filter(todo => todo.id !== id);
    this.props.assignTodos(newTodoList);
    await AsyncStorage.setItem("TODOS", JSON.stringify(newTodoList));
  };

  onSubmitTodo = async () => {
    const newTodo = {
      body: this.props.input,
      status: "Active",
      id: this.props.todos.length + 1
    };
    const newTodoList = [newTodo, ...this.props.todos];
    await AsyncStorage.setItem("TODOS", JSON.stringify(newTodoList));
    this.props.assignTodos(newTodoList);
  };

  render() {
    console.log(this.props);
    const { addInput, addTodo, loading, todos, input } = this.props;

    return (
        (!loading) ? (
          <ImageBackground
            style={styles.container}
            source={require("../assets/images/eiffel_2.jpg")}
          >
            <View
              style={{
                flex: 1,
                width: "90%",
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  value={input}
                  style={styles.todoInput}
                  onChangeText={text => addInput(text)}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onSubmitTodo}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 7, width: "95%" }}>
              <View style={{ flex: 1, padding: 10 }}>
                <ScrollView
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(177, 150, 128, 0.5)",
                    borderRadius: 20,
                    padding: 10
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 30 }}>
                      Todo List
                    </Text>
                  </View>
                  <View style={{ flex: 6, paddingBottom: 30 }}>
                    {todos.sort().map((todo, idx) => {
                      return (
                        <TodoItem
                          idx={idx}
                          todo={todo}
                          key={idx}
                          onToggleTodo={this.onToggleTodo}
                          onDeleteTodo={this.onDeleteTodo}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            style={styles.container}
            source={require("../assets/images/eiffel_2.jpg")}
          >
            <ActivityIndicator size="large" />
          </ImageBackground>
        )
    );
  }
}


AllScreen.navigationOptions = {
  //title: "All todos"
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundColor: "black",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: "95%",
    color: "white",
    borderRadius: 5,
    flexWrap: "wrap"
  },
  todoText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  todoInput: {
    width: "95%",
    minHeight: 30,
    color: "white",
    borderWidth: 1,
    //marginTop: "20%",
    //marginBottom: "5%",
    borderColor: "grey"
  },
  inputContainer: {
    //flex: 1,
    width: "90%",
    //marginTop: 20,
    //marginBottom: "10%",
    alignItems: "center",
    justifyContent: "center"
    //marginBottom: 100
  },
  button: {
    height: 50,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "blue",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});

mapStateToProps = (state) => {
  return {todos, input, loading} = state;
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addTodo, addInput, setLoadingFalse, setLoadingTrue, assignTodos}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllScreen)