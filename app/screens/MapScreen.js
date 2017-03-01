'use strict'
import React, { Component} from 'react'
import {Text, View, StyleSheet, Dimensions } from 'react-native'
import StatusBarBackground from '../components/StatusBarBackground'
import MapView from 'react-native-maps'


const {width, height} = Dimensions.get('window')

class MapScreen extends Component {

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({ currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }})
      },
      (error) => alert(error.message),
      {timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log(position)
      this.setState({currentRegion: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }})
    })
  }
  
  render () {
    
    return(
      
      <View style={styles.container}>
        <MapView
          showsUserLocation = {true}
          style={styles.map}
          // region={this.state.currentRegion}
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
  	flex: 1,
    width: width
  }
});

module.exports = MapScreen