import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import TwoColumnImages from './TwoColumnImages';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

//The social media profile
export default class Profile extends Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* The info: avatar, name, follow and send message button */}
        <View style={styles.infoWrap}>
            <Image source={this.props.avatar} style={styles.avatar} resizeMode='contain'/>
            <View style={styles.nameWrap}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.hashTag}>{this.props.hashTag}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.followButton}
                  onPress={this.props.onFollowPress}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}
                  onPress={this.props.onSharePress}
                >
                  <FontAwesome name="send-o" backgroundColor="#3b5998" iconStyle={styles.shareButtonIcon} size={25}/>
                </TouchableOpacity>
              </View>
            </View>
        </View>

        {/* The followers ... number */}
        <View style={styles.followersWrap}>
          <View style={styles.sections}>
            <Text style={styles.numbers}>{this.props.number1}</Text>
            <Text style={styles.title}>{this.props.title1}</Text>
          </View>
          <View style={styles.sections}>
            <Text style={styles.numbers}>{this.props.number2}</Text>
            <Text style={styles.title}>{this.props.title2}</Text>
          </View>
          <View style={styles.sections}>
            <Text style={styles.numbers}>{this.props.number3}</Text>
            <Text style={styles.title}>{this.props.title3}</Text>
          </View>
        </View>

        {/* The images */}
        <View style={styles.imagesWrap}>
          <TwoColumnImages imgData={this.props.imgData}/>
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoWrap: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    height: null,
    width: null,
    flex: 1,
    borderRadius: 300
  },
  nameWrap: {
    flex: 1.2,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },  
  hashTag: {
    paddingBottom: 10,
    paddingLeft: 5,
    color: 'blue'
  },
  buttons: {
    flexDirection: 'row',
    padding: 5
  },
  followButton: {
    flex: 3,
    backgroundColor: '#6e34eb',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
  followButtonText: {
    color: 'white',
    
  },
  shareButton: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00f7ff',
    borderRadius: 100,

    marginLeft: 5,
    padding: 5,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  shareButtonIcon: {
    flex: 1,
    width: null,
    height: null
  },
  followersWrap: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  sections:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numbers: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 15,
    color: 'gray'
  },

  imagesWrap: {
    flex: 8
  }
});


