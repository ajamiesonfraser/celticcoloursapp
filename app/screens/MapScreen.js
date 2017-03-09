'use strict'

import React, {Component} from 'react'
import { StyleSheet, PropTypes, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
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
          latitude: 1, 
          longitude: 1
        },
        community: "unknown",
        title: "unknown",
        description: "unknown",
        photo: "unknown",
        date: "unknown",
        startTime: "unknown",
        endTime: "unknown"
      }]
    };
  },

  componentDidMount: function() {

    axios.get('https://novastream.ca/xml2json.php?org=23324&type=shows&field=name,poster_url,venue_name,venue,formatted_date,formatted_start_time,formatted_end_time')
    .then((response) => {
      var aList = response.data
      var markers = []
        for (var shows in aList) {
          markers = markers.concat([{
            latlng: {
              latitude: aList[shows].venue[0].latitude,
              longitude: aList[shows].venue[0].longitude
            },
            community: aList[shows].venue[0].community,
            title: aList[shows].name,
            description: aList[shows].venue_name,
            photo: aList[shows].poster_url,
            image: require ('../assets/musicMapPin.png'),
            date: aList[shows].formatted_date,
            startTime: aList[shows].formatted_start_time,
            endTime: aList[shows].formatted_end_time
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
              image={marker.image}
            >
              <MapView.Callout
                style={styles.callout}>
                <View style={styles.calloutView1}>
                  <Image style={styles.calloutPhoto} source={{uri: marker.photo}}/>
                </View>
                <View style={styles.calloutView2}>
                  <Text style={styles.calloutTitle}>{marker.title}</Text>
                  <Text style={styles.calloutVenue}>{marker.description}</Text>
                  <Text style={styles.calloutCommunity}>{marker.community}</Text>
                  <Text style={styles.calloutDate}>{marker.date}</Text>
                  <Text style={styles.calloutTime}>{marker.startTime} - {marker.endTime}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
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
  callout:{
    padding: 15,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 230,
    width: 210
  },
  calloutView1: {
    alignItems: 'center',
    marginBottom: 10
  },
  calloutView2: {
    alignItems: 'center'
  },
  calloutPhoto:{
    width: 150,
    height: 75,
    borderRadius: 5
  },
  calloutTitle:{
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  calloutVenue:{
    fontSize:13,
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 3,
    color: '#0076FF'
  },
  calloutDate:{
    marginTop:5,
    fontWeight: 'bold',
    fontSize: 11
  },
  calloutTime:{
    color:'#e95644',
    fontSize: 13
  },
  calloutCommunity:{
    fontSize:11
  },
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