
import React from 'react';
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native'

import FeedScreen from './FeedScreen';
import ProfileSreen from './ProfileScreen';
import OpenCameraScreen from './OpenCameraScreen';

/*
Finish all coderschool request

Future develop: 
  Open camera
  In news feed, when click the picture, they fullscreen
  When click on the status on newsfeed or on the image profile will navigate 
    to the status info
*/

const Social = createBottomTabNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: (<MaterialCommunityIcons name='newspaper' size={25} />),
      tabBarButtonComponent: TouchableOpacity
    },
  },
  OpenCamera: {
    screen: OpenCameraScreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: (<MaterialCommunityIcons name='plus-box-outline' size={25} />),
      tabBarButtonComponent: TouchableOpacity
    },
  },
  Profile: {
    screen: ProfileSreen,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: (<MaterialCommunityIcons name='face-profile' size={25} />),
      tabBarButtonComponent: TouchableOpacity
    },
  },
},
{
  tabBarOptions: {
    activeBackgroundColor: '#ededed',
    showLabel: false,
  }
});


export default createAppContainer(Social);
