import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, 
          TouchableOpacity } from 'react-native';
import SocialFeedList from '../../src/component/SocialFeedList';

export default class FeedScreen extends Component {

  constructor(props){
    super(props);
    this.state= {
    }
  }

  render() {
  
    const feedData = [
      {id: '1', name: 'Tony Start', avaData: require('../../assets/avatar.png'), STT: 'blabla', imgData: require('../../assets/1.jpg'), liked: 21},
      {id: '2', name: 'Tony Start2', avaData: require('../../assets/avatar.png'), STT: 'blabla', imgData: require('../../assets/2.jpg'), liked: 22},
      {id: '3', name: 'Tony Start3', avaData: require('../../assets/avatar.png'), STT: 'blabla', imgData: require('../../assets/3.jpg'), liked: 23},
      {id: '4', name: 'Tony Start4', avaData: require('../../assets/avatar.png'), STT: 'blabla', imgData: require('../../assets/4.jpg'), liked: 24},
      {id: '5', name: 'Tony Start5', avaData: require('../../assets/avatar.png'), STT: 'blabla', imgData: require('../../assets/5.jpg'), liked: 25},
      {id: '6', name: 'Tony Start6', avaData: require('../../assets/avatar.png'), STT: 'blabla', imgData: require('../../assets/6.jpg'), liked: 26}
    ]

    return (
        <View style={{flex: 1}}>
            <SocialFeedList
              feedData={feedData}
            />
        </View>
    )
  }
}
