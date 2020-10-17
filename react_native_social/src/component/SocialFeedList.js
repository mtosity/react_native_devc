import React, {Component} from 'react';
import { StyleSheet, Image, View, SafeAreaView, FlatList } from 'react-native';
import SocialFeed from './SocialFeed';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default class SocialFeedList extends Component {

    constructor(props){
        super(props);
    }

    //show list of feed with instagram header
    render() {
        return (
          <ScrollView style={{flex: 1}}>
            <View style={styles.headerWrap}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'}}
                style={styles.headerImage}
                resizeMode="contain"
              />
              <Feather name="inbox" size={27} color="black" style={{paddingRight: 5}}/>
            </View>
            <FlatList
              data= {this.props.feedData}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return(
                <View style={{paddingBottom: 10, paddingTop: 10}}>
                  <SocialFeed 
                    name={item.name}
                    STT={item.STT}
                    height={500}
                    avaData={item.avaData}
                    imgData={item.imgData}
                    likePressed={() => alert('liked')}
                    cmtPressed={() => alert('cmt pressed')}
                    sharePressed={() => alert('share pressed')}
                    liked={item.liked}
                  />
                </View>
                );
              }}
            />
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

  headerWrap: {
    flexDirection: 'row',
    backgroundColor: '#f3f6fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight, //for the phone notch, SafeWrapView not work for android
  },
  headerImage: {
    flex: 1,
    width: null,
    height: 44,
    marginLeft: 27 - 5
  }
})