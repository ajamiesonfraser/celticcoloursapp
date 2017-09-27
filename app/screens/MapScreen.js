'use strict'

import React, {Component} from 'react'
import { StyleSheet, PropTypes, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import MapView from 'react-native-maps'
import axios from 'axios'
import _ from 'lodash'
import Screen from './Screen'
import Client from '../services/Client'

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

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
      totalMarkers:[],
      markers: []
    };
  },

  componentDidMount() {    

    this.dataLoadedHandler = Client.events.addListener('data loaded', (data) => {
      let totalMarkers = Object.keys(data.shows).map((key) => {
        return {
          markerData: Client.getShowById(key),
          image: require ('../assets/pin1.png')
        }
      })

      const wMarkers = Object.keys(data.workshops).map((key) => {
        return {
          markerData: Client.getWorkshopById(key),
          image: require ('../assets/pin2.png')
        }
      })

      totalMarkers.push.apply(totalMarkers, wMarkers);
      
      const markers = totalMarkers;

      this.setState({
        totalMarkers,
        markers
      })
    })

    Client.loadData()

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

      // this.onRegionChange(newRegion);
    });
  },

  componentWillUnmount: function() {
    this.dataLoadedHandler.remove()
    navigator.geolocation.clearWatch(this.watchID);
  },

  onRegionChange(region) {
    this.setState({ region });
  },

  render() {
        
    
    return (
      <Screen
        navTitle='Discover Nearby'
        canGoBack={this.props.navigator.getCurrentRoutes().length > 1}
        onBack={() => this.props.navigator.pop()}
        filterBar={true}
        markers={this.state.totalMarkers}
        onMarkersChange={(searchMarkers)=>{  
          this.setState({
            markers:searchMarkers
          })
        }}
      >
        <MapView
          ref="map"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
        >
          {this.state.markers.map((marker,i) => (
            <MapView.Marker
              key={i} 
              coordinate = {{
                latitude: marker.markerData.venue[0].latitude == "" ? 0 : marker.markerData.venue[0].latitude,
                longitude: marker.markerData.venue[0].longitude == "" ? 0 : marker.markerData.venue[0].longitude
              }}
              flat = {true}
              title={marker.markerData.name}
              description={marker.markerData.venue_name}
              image={marker.image}
              >
              <MapView.Callout
                onPress={(event) => this._navigateToEventDetail(marker)}
                style={styles.callout}>
                <View style={styles.calloutView1}>
                  <Image style={styles.calloutPhoto} source={{uri: marker.markerData.poster_url}}/>
                </View>
                <View style={styles.calloutView2}>
                  <Text style={styles.calloutTitle}>{marker.markerData.name}</Text>
                  <Text style={styles.calloutVenue}>{marker.markerData.venue_name}</Text>
                  <Text style={styles.calloutCommunity}>{marker.markerData.venue[0].community}</Text>
                  <Text style={styles.calloutDate}>{marker.markerData.formatted_date}</Text>
                  <Text style={styles.calloutTime}>{marker.markerData.formatted_start_time} - {marker.markerData.formatted_end_time}</Text>
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
      </Screen>
    );
  },  

  _navigateToEventDetail(marker) {
    this.props.navigator.push({
      ident: "EventDetail",
      passProps: {
        urlData: marker.markerData
      }
    })
  }

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