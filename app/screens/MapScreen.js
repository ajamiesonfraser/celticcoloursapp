'use strict'

import React, {Component} from 'react'
import { StyleSheet, PropTypes, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import axios from 'axios'
import _ from 'lodash'
import Screen from './Screen'
import ViewContainer from '../components/ViewContainer'
import Client from '../services/Client'

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 46.139907;
const LONGITUDE = -60.195829;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const EVENT_DATES = [
  '2017-10-06',
  '2017-10-07',
  '2017-10-08',
  '2017-10-09',
  '2017-10-10',
  '2017-10-11',
  '2017-10-12',
  '2017-10-13',
  '2017-10-14',
]

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const stringDateToFormattedDate = (stringDate, includeYear=true) => {
  const [year, month, day] = stringDate.split('-').map(x => parseInt(x, 10))
  const dateObject = new Date(year, month - 1, day)
  
  let str = `${DAYS_OF_WEEK[dateObject.getDay()]} ${MONTH_NAMES[dateObject.getMonth()]} ${dateObject.getDate()}`

  if (includeYear) {
    str += ` ${dateObject.getFullYear()}`
  }

  return str
}


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
      markers: [],
      dateFilter: 'All Dates',
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

  renderFilterBar() {
    return (
      <View style={{height: 40}}>
        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>          
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}/>
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}/>
            <ModalDropdown
              defaultIndex={0}
              options={['All Dates'].concat(EVENT_DATES.map(x => stringDateToFormattedDate(x, false)))}
              style={styles.filterButtonContainerStyle}
              dropdownStyle={{
                height: (33 + StyleSheet.hairlineWidth) * (EVENT_DATES.length + 2)
                }                
              }
              textStyle={styles.filterButton}
              onSelect={(idx, value) => {
                this.setState({
                  dateFilter: value != 'All Dates'
                    ? EVENT_DATES[idx - 1] // -1 is for 'all' option being first
                    : value
                }, () => {
                this._applyFilters() 
                })
              }}
              >
              <View style={styles.filterButtonContent}>
                {this.renderDateText()}
                <Icon
                  style={styles.filterDropdownIcon}
                  name="angle-down" size={18}
                />
              </View>
            </ModalDropdown>
          </View>
        </View>
      </View>
    )
  },

  _applyFilters(){
    const filteredByDate = (this.state.dateFilter != 'All Dates' && this.state.dateFilter != null)
    ? this.state.markers.filter(x => 
      this.state.dateFilter == x.markerData.date
    )
    : this.state.markers

    this.setState({
      markers:filteredByDate
    })
  },

  renderDateText(){
    let text = "";
    if(this.state.dateFilter == 'All Dates'){
      text = this.state.dateFilter;
    }else{
      text = stringDateToFormattedDate(this.state.dateFilter, false);
    }

    return (
      <Text style={styles.buttonText}>{text}</Text>
    )
  },

  render() {        
    
    return (
      <ViewContainer style={{backgroundColor:'white'}}>  
        {this.renderFilterBar()}
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
      
      </ViewContainer>
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
    top: 40,
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
  filterButtonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderColor: '#3d97e8'
  },

  filterButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  filterButton: {
    flex: 1,
    fontSize: 14,
    color: 'red',
  },

  filterDropdownIcon: {
    marginLeft: 5,
    color: '#FD3443'
  },
  buttonText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#FD3443'
  },
});

module.exports = MapScreen;