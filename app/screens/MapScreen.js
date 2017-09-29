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

import Map from '../components/Map';
import Points from '../assets/Points.json';

var { width, height } = Dimensions.get('window');

const LATITUDE = 46.139907;
const LONGITUDE = -60.195829;

const LATITUDE_DELTA = 0.0922 / 1.2;
const LONGITUDE_DELTA = 0.0421 / 1.2;

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
          type: "shows"
        }
      })

      const wMarkers = Object.keys(data.workshops).map((key) => {
        return {
          markerData: Client.getWorkshopById(key),
          type: "workshops"
        }
      })

      totalMarkers.push.apply(totalMarkers, wMarkers);
      
      const markers = this.changeMarkerTypes(totalMarkers);

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

  changeMarkerTypes(markers){
    const changedMarkers = markers.map((marker, i)=>{
      return{
        "idx":i,
        "type": "Feature",
        "properties": {
          "featureclass": "Marker"
        },
        "markerActivity":false,
        "data":marker,
        "geometry": {
          "type": "Point",
          "coordinates": [marker.markerData.venue[0].longitude, marker.markerData.venue[0].latitude]
        }
      }
    });
    return changedMarkers;
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
    ? this.state.totalMarkers.filter(x => 
      this.state.dateFilter == x.markerData.date
    )
    : this.state.totalMarkers

    const markers = this.changeMarkerTypes(filteredByDate);

    this.setState({
      markers
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
        {/* <MapView
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
        </MapView> */}
        <Map
          mapPoints={this.state.markers}   
          region={this.state.region}       
        />
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