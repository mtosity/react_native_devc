import React, { Component } from 'react';
import Profile from '../../src/component/Profile';
import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default class App extends Component {
  render() {

    //Because I want to navigate to the status info like when press so i put onPress in imgData
    const imgData = [
      { id: '1', imgSource: require('../../assets/1.jpg'), onPress: () => alert('image')  },
      { id: '2', imgSource: require('../../assets/2.jpg'), onPress: () => alert('image')  },
      { id: '3', imgSource: require('../../assets/3.jpg'), onPress: () => alert('image')  },
      { id: '4', imgSource: require('../../assets/4.jpg'), onPress: () => alert('image')  },
      { id: '5', imgSource: require('../../assets/5.jpg'), onPress: () => alert('image')  },
      { id: '6', imgSource: require('../../assets/6.jpg'), onPress: () => alert('image')  },
      { id: '7', imgSource: require('../../assets/7.jpg'), onPress: () => alert('image')  },
      { id: '8', imgSource: require('../../assets/8.jpg'), onPress: () => alert('image')  },
      { id: '9', imgSource: require('../../assets/9.jpg'), onPress: () => alert('image')  }
    ];

    const avatar = require('../../assets/avatar.png');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name='keyboard-backspace' size={30} onPress={() => {alert('back')}} />
                <MaterialCommunityIcons name='image-filter-center-focus-weak' size={30} onPress={() => {alert('filter')}}/>
            </View> 
            <Profile
                style={{paadingTop: 10}}
                avatar={avatar}
                name='Tony Stack'
                hashTag='#Genius #Billionare #PlayBoy #Philanthropist'
                onFollowPress={() => alert('fllowed')}
                onSharePress={() => alert('message sended')}

                number1 = '69'
                title1 = 'Photos'
                number2 = '69k'
                title2 = 'Followers'
                number3 = '906'
                title3 = 'Followings'

                imgData={imgData}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: Constants.statusBarHeight, //notch
  },
  header: {
    width: '100%', 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingLeft: 15,
    paddingRight: 15, 
    flexDirection: 'row',
    position: 'absolute',
    elevation: 5
  },
})