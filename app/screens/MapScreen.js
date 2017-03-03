'use strict'
import React, { Component} from 'react'
import {Text, View, StyleSheet, Dimensions } from 'react-native'
import StatusBarBackground from '../components/StatusBarBackground'
import MapView from 'react-native-maps'

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;

var LATITUDE_DELTA = 0.3022;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRegion: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({ currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }})
      },
      (error) => alert(error.message),
      {timeout: 20000, maximumAge: 1000}
    )
  }
  
  render () {
    console.log(this.state.currentRegion)
    return(
      
      <View style={styles.container}>
        <MapView
          showsUserLocation = {true}
          style={styles.map}
          initialRegion={this.state.currentRegion}
        />
      </View>
    )
  }
 }

 

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
  	flex: 1
  }
});

module.exports = MapScreen