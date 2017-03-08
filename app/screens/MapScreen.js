'use strict'

import React, {Component} from 'react'
import { StyleSheet, PropTypes, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import axios from 'axios'

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Mumbai
const LATITUDE = 46.139907;
const LONGITUDE = -60.195829;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



var MapScreen = React.createClass({


  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers:[{
        latlng: {
          latitude: 46.139907, 
          longitude: -60.195829
        },
        title: "Governors Pub",
        description: "This is the place where we eat and play music"
      },
      {
        latlng: {
          latitude: 46.142229, 
          longitude: -60.199739
        },
        title: "Joan Harris Cruise Pavilion",
        description: "The biggest fiddle"
      },
      {
        latlng: {
          latitude: 46.141500, 
          longitude: -60.193012
        },
        title: "Cape Breton Post",
        description: "an absolutely shite paper"
      }]
    };
  },

  componentDidMount: function() {

    axios.get('https://novastream.ca/xml2json.php?org=23324&type=shows&field=name,poster_url,venue_name,venue')
    .then((response) => {
      console.log(response.data)
      var aList = response.data
      var markers = []
        for (var shows in aList) {
          markers = markers.concat([{
            latlng: {
              latitude: aList[shows].venue[0].latitude,
              longitude: aList[shows].venue[0].longitude
            },
            title: aList[shows].name,
            description: aList[shows].venue_name
          }])
      }
      this.setState({
        markers:markers
      })
    })
    .done(),

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.onRegionChange(newRegion);
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  onRegionChange(region) {
    this.setState({ region });
  },

  

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation = {true}
        >
          {this.state.markers.map((marker,i) => (
            <MapView.Marker
            key={i} 
              coordinate = {marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={styles.bubble}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

module.exports = MapScreen;