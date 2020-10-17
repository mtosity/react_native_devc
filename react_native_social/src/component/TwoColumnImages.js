import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default class TwoColumnImages extends Component {
  

  constructor(props){
    super(props);
  }

  render() {

    //Sort the image array to 2 array
    const imgDataLeft = []; 
    const imgDataRight = []; 

    //first image will go to the left, second the right
    //then the next image will go to the lower height side
    var leftHeight = 0, righHeight = 0;
    this.props.imgData.forEach((img, index) => {
      const imageHeight = Image.resolveAssetSource(img.imgSource).height;
      if(index == 0){
        imgDataLeft.push(img);
        leftHeight+=imageHeight;
      }
      else if(index == 1){
        imgDataRight.push(img);
        righHeight+=imageHeight;
      }
      else {
        if(leftHeight > righHeight){
          imgDataRight.push(img);
          righHeight+=imageHeight;
        }
        else {
          imgDataLeft.push(img);
          leftHeight+=imageHeight;
        }
      }
    })


    //image: set the width, the height will based on the image ratio
    return (
          <View style={styles.container}>
            <View style={styles.halfscreenContainer}>
              <FlatList
                data={imgDataLeft}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const imageInfo = Image.resolveAssetSource(item.imgSource);
                  const scale = imageInfo.width / imageInfo.height;
                  return(
                    <TouchableOpacity style={[styles.imageContainer, {aspectRatio: scale}]}
                      onPress={item.onPress}
                    >
                      <Image style={styles.image} source={item.imgSource} resizeMode='cover'/>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>

            <View style={styles.halfscreenContainer}>
              <FlatList
                data={imgDataRight}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const imageInfo = Image.resolveAssetSource(item.imgSource);
                  const scale = imageInfo.width / imageInfo.height;
                  return(
                    <TouchableOpacity style={[styles.imageContainer, {aspectRatio: scale}]}
                      onPress={item.onPress}
                    >
                      <Image style={styles.image} source={item.imgSource} resizeMode='cover'/>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  halfscreenContainer: {
    flex: 1,
  },
  imageContainer:{
    width: '100%',
    height: null,
    padding: 10
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10
  }
});