import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default class Box extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { size, onPress, onLongPress } = this.props;
    if (this.props.status === 0) {
      return (
        <TouchableOpacity
          style={{
            height: size,
            width: size,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black"
          }}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else if (this.props.status === 1) {
      return (
        <TouchableOpacity
          style={{
            height: size,
            width: size,
            backgroundColor: "black",
            borderWidth: 1,
            borderColor: "black"
          }}
          onPress={this.props.onPress}
          onLongPress={onLongPress}
        >
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else if (this.props.status === 2) {
      return (
        <TouchableOpacity
          style={{
            height: size,
            width: size,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.props.onPress}
          onLongPress={onLongPress}
        >
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else if (this.props.status === 3) {
      return (
        <TouchableOpacity
          style={{
            height: size,
            width: size,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.props.onPress}
          onLongPress={onLongPress}
        >
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else if (this.props.status === -1) {
      return (
        <TouchableOpacity
          style={{
            height: size,
            width: size,
            backgroundColor: "#31396b",
            borderWidth: 1,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.props.onPress}
          onLongPress={onLongPress}
        >
          <Text style={{color: 'white'}}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return <Text>Something wrong</Text>;
    }
  }
}
