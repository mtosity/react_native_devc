import React, { Component } from "react";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker, Callout } from "react-native-maps";
import Lightbox from "react-native-lightbox";
import * as ImagePicker from "expo-image-picker";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: null,
      errorMessage: null,
      selectedLocation: [],
      selectedImage: null
    };
  }

  async componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      await this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      await this._getLocationAsync();
    }

    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    await this.setState({ loading: false });
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access photo storage was denied"
      });
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      await this.setState({ location });
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1]
    });

    // console.log(result);

    return result;
  };

  _mapLongPress = async event => {
    coords = {};
    Object.assign(coords, event.nativeEvent.coordinate);
    image = await this._pickImage();
    this.setState({
      selectedLocation: [...this.state.selectedLocation, { coords, image }]
    });
  };

  render() {
    // console.log(this.state.location);
    return this.state.loading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
        <Text>{this.state.errorMessage}</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onLongPress={this._mapLongPress}
        >
          {this.state.selectedLocation.map((location, index) => {
            return (
              <Marker coordinate={location.coords} key={index}>
                <Callout>
                  <View style={styles.calloutView}>
                    {/* <Image
                      source=
                      style={styles.calloutImage}
                    /> */}
                    <Lightbox underlayColor="white">
                    <Image
                      style={styles.calloutImage}
                      resizeMode="contain"
                      source={location.image}
                    />
                    </Lightbox>
                    <Text style={styles.calloutTitle}>Hello</Text>
                    <Text>Latitude: {parseInt(location.coords.latitude)}</Text>
                    <Text>
                      Longtitude: {parseInt(location.coords.longitude)}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  calloutView: {
    flex: 1,
    backgroundColor: "white"
  },
  calloutImage: {
    width: 100,
    height: 100
  },
  calloutTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5
  }
});
