import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const HEIGHT_SCREEN = Dimensions.get('window').height;
const WIDTH_SCREEN = Dimensions.get('window').width;

//One social media feed (status)
export default class SocialFeed extends Component {
    constructor(props){
        super(props);
    }

    render() {
        {/* 
            Set the size based on the height props user input
            ---
            Total flex: 6
            0.7: name and avatar
            4.9: feed (status)
                0.4: words
                4.5: image
            bottom buttons: 0.4
            ---
            The image will be square, the height based on the total feed height
        */}
        const nameSize = (this.props.height * 0.7 / (0.7 + 5 + 0.4)) / 3;
        const pictureSize = this.props.height * 0.7 / (0.7 + 5 + 0.4) - 5;
        const buttonSize = this.props.height * 0.4 / (0.7 + 5 + 0.4) - 5;

        return (
            <View style={[styles.container, {height: this.props.height}]}>

                <View style={styles.infoUser}>
                    <View>
                        <Image source={this.props.avaData} style={[styles.avatar, 
                            {height: pictureSize}]} resizeMode='cover'/>
                    </View>
                    <Text style={[styles.name, {fontSize: nameSize}]}>{this.props.name}</Text>
                </View> 

                <View style={styles.feed}>
                    <View style={styles.feedSTT}>
                        <Text>{this.props.STT}</Text>
                    </View>
                    <View style={styles.feedImageContainer}>
                        <Image source={this.props.imgData} style={styles.feedImage}/>
                    </View>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={this.props.likePressed}>
                        <AntDesign name="hearto" backgroundColor="#3b5998" iconStyle={styles.shareButtonIcon} size={buttonSize} style={styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.cmtPressed}>
                        <MaterialCommunityIcons name="comment-outline" backgroundColor="#3b5998" iconStyle={styles.shareButtonIcon} size={buttonSize} style={styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.sharePressed}>
                        <Feather name="share" backgroundColor="#3b5998" iconStyle={styles.shareButtonIcon} size={buttonSize} style={styles.button}/>
                    </TouchableOpacity>
                    <Text style={styles.likeInfo}>{this.props.liked} likes</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    infoUser: {
        flex: 0.7, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    avatar: {
        aspectRatio: 1,
        borderRadius: 500
    },
    name: {
        paddingLeft: 10,
        fontSize: 20
    },
    feed: {
        flex: 4.9,
    },
    feedSTT: {
        flex: 0.4,
        justifyContent: 'center',
        paddingLeft: 15
    },
    feedImageContainer: {
        flex: 4.5
    },
    feedImage: {
        flex: 1,
        width: null,
        height: null
    },
    buttons: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingLeft: 15
    },
    likeInfo: {
        paddingLeft: 10,
        fontSize: 15
    }
});