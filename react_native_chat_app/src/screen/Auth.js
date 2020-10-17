import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import firebase from "firebase";

export default class Auth extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: Constants.statusBarHeight,
          alignItems: "center",
          padding: 5
        }}
      >
        <Text style={{ padding: 10 }}>Input your name</Text>
        <View style={{ padding: 10, width: '100%' }}>
          <TextInput
            style={{
              width: "100%",
              height: 50,
              borderWidth: 1,
              paddingHorizontal: 10
            }}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "30%",
            height: 30,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5
          }}
          onPress={() =>
            this.props.navigation.navigate("Chat", { name: this.state.name })
          }
        >
          <Text style={{ color: "white", fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
