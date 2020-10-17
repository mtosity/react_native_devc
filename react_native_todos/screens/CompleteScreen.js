import React from "react";
import { Text, View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import TodoItem from "../components/TodoItem";
import Constants from 'expo-constants';

import { TODOS } from "../utils/data.js";


import {connect} from 'react-redux'

function CompleteScreen() {
  const completed = todos.filter(item => item.status === "Done");
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/eiffel_1.jpg")}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={styles.container}>
          {
            completed.map((todo, idx) => {
              return (
                <View style={styles.wraper} key={idx}>
                  <View style={styles.card}>
                    <Text style={styles.cardText}>{todo.id}. {todo.body}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

CompleteScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 10
  },
  wraper: {
    //
    width: '100%',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",




  },
  card: {
    backgroundColor: 'rgba(0, 45, 245, 0.7)',
    width: '90%',
    padding: 10,
    //backgroundColor: 'blue'
    borderRadius: 20


  },
  cardText: {
    color: 'white',
    fontSize: 20,
  }
});

mapStateToProps = (state) => {
  return ({todos} = state)
}

export default connect(mapStateToProps)(CompleteScreen)