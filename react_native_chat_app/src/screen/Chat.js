import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: ""
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.navigation.getParam("name") });
    if (!firebase.apps.length) {
      var firebaseConfig = {
        
      }; //just pass your firebase app api key
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      this.setState({needLoadFirebase: false});
    }
    
    this.fetchMessages();
    this.listenOnChangeMessages();
  }

  readMessages = snapshotData =>
    (typeof snapshotData === "object" && Object.values(snapshotData)) ||
    snapshotData;

  fetchMessages = async () => {
    const snapshot = await firebase.database().ref("/messages").once("value");

    if (snapshot.val() != undefined) {
      console.log("fetch");
      const messages = this.readMessages(snapshot.val());
      this.setState({ messages });
    }
  };

  listenOnChangeMessages = () => {
    firebase.database().ref("/messages").on("value", snapshot => {
      if (snapshot.val() != undefined) {
        console.log("listen");
        const messages = this.readMessages(snapshot.val());
        this.setState({ messages });
      }
    });
  };

  getUserID = name => {
    let id = 1;
    this.state.messages.map(message => {
      if (message.user.name === name) {
        return message.user._id;
      } else if (message.user._id > id) {
        id = message.user._id;
      }
    });
    return id + 1;
  };

  onSend = (messages = []) => {
    const { name } = this.state;
    const newMessage = messages[0];
    const { user } = newMessage;
    user.name = name;
    user.avatar = "https://placeimg.com/140/140/any";
    //id = 1
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    firebase.database().ref("/messages").push(newMessage);
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages.reverse()}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.getUserID(this.state.name)
        }}
      />
    );
  }
}
