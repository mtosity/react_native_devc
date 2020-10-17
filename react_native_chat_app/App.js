import React from 'react'
import AuthScreen from './src/screen/Auth';
import ChatScreen from './src/screen/Chat';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const navi = createStackNavigator({
  Auth: {
    screen: AuthScreen,
  },
  Chat: {
    screen: ChatScreen,
  }
})


export default createAppContainer(navi);