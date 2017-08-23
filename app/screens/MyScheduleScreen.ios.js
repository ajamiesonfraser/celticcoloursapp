'use strict'
import React, { Component} from 'react'
import {ActivityIndicator, AsyncStorage, Text, View, ListView, TouchableOpacity, StyleSheet, Image, Button } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import GetDirectionsButton from '../components/GetDirectionsButton'
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown'

const dateOptions = [ "Friday, Oct. 6", "Saturday, Oct. 7", "Sunday, Oct. 8", "Monday, Oct. 9", "Tuesday, Oct. 10", "Wednesday, Oct. 11", "Thursday, Oct. 12", "Friday, Oct. 13", "Saturday, Oct. 14" ]


class MyScheduleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      // changedData: []
    }
  }

  _getShows() {
    return axios.get('https://novastream.ca/xml2json.php?org=23998&type=shows&local=yes&field=name,formatted_date,date,poster_url,formatted_start_time,venue_name,venue,seating,price,description_public,performances')
    .then((response) => {
      return response.data
    })
  }

  _getArtistsFromShows(shows) {
    var artists = {}

    Object.keys(shows).forEach(key => {
      if (shows[key].performances) {
        shows[key].performances.forEach(({ performance }) => {
          Object.keys(performance).forEach(artistId => {
            artists[artistId] = performance[artistId]
          })
        })
      }
    })

    return artists
  }

  componentDidMount(){
    Promise.all([
      AsyncStorage.getItem('shows'),
      AsyncStorage.getItem('artists')
    ]).then(([shows, artists]) => {

      if (shows == null) {
        return this._getShows().then((shows) => {
          return AsyncStorage.setItem('shows', JSON.stringify(shows)).then(() => {
            var artists = this._getArtistsFromShows(shows)
            return AsyncStorage.setItem('artists', JSON.stringify(artists)).then(() => {
              return {
                shows,
                artists
              }
            })
          })
        })
      }

      var showsParsed = JSON.parse(shows)
      var artistsParsed;

      // have to load artists
      if (artists == null) {
        artistsParsed = this._getArtistsFromShows(showsParsed) 
      } else {
        artistsParsed = JSON.parse(artists)
      }

      return {
        shows: showsParsed,
        artists: artistsParsed
      }
    }).then(({ shows, artists }) => {
      console.log({ shows, artists })

      var listData = []
      for (var id in shows) {
        listData = listData.concat([{
          urlData: shows[id]
        }])
      }

      this.setState({
        listData,
        artists,
        shows
      })
    })
  }


  
  _renderListingRow(listing) {

    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToEventDetail(listing) }>
        <Image style={styles.listingPicture} source={{uri: listing.urlData.poster_url}}/>
        <View style={styles.listingInfo}>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.name}</Text>
          <Text style={styles.listingDate}>{listing.urlData.formatted_date}</Text>
          <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.venue_name}</Text>
        </View>
        <Text style={styles.startTime}>{listing.urlData.formatted_start_time}</Text>
        <GetDirectionsButton
          mapUrl={listing.urlData.venue[0].google_maps_link}/>
      </TouchableOpacity>

    )
  }

  // _changeDateSaturday(){
  //   this.setState({
  //     changedData: grouped['2017-10-07']
  //   })
  // }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar 
        navTitle = "My Schedule"
        rightButton={
          <ModalDropdown 
            options={dateOptions}
            // onPress={() => this._changeDateSaturday}
            // onSelect={(idx, value) => this._changeDateSaturday}
            >
            <Icon
              style={styles.buttonIcon}
              name="angle-down" size={35} />
          </ModalDropdown>
        }
        />

        {this.state.shows != null && this.state.artists != null
          ? <ListView
              pageSize={1}
              initialListSize={5}
              scrollRenderAheadDistance={1}
              enableEmptySections={true}
              dataSource={ds.cloneWithRows(this.state.listData)}
              renderRow={(listing) => {
                return this._renderListingRow(listing)
              }}  
            />
          : <ActivityIndicator size={'large'}/>}
      </ViewContainer>
    )
  }



  

  _navigateToEventDetail(listing) {
    this.props.navigator.push({
      ident: "EventDetail",
      passProps: {
        urlData:listing.urlData
      }
    })
  }

}

const styles = StyleSheet.create({
  buttonIcon:{
    marginTop: 10,
    marginRight: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: 'red'
  },
  listingInfo:{
    flexDirection: "column",
    width:200,
    marginTop: 15
  },
  startTime: {
    marginRight: 5,
    flexDirection: "column",
    color: "#F6655E",
    fontSize: 17
  },
   listingDate: {
    marginLeft: 15,
    paddingBottom: 5,
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  listingVenue: {
    marginLeft: 15,
    width: 170,
    color: '#0076FF',
    paddingBottom: 5,
    fontSize: 11
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "center",
    height: 150,
    flexWrap: "wrap",
    alignItems: 'center'
  },
  listingPicture:{
    backgroundColor: '#9B9B9B',
    height: 50,
    width:75,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 5
  },
  listingName: {
    marginLeft: 15,
    flexDirection: 'column',
    width: 175,
    fontSize: 17,
    paddingBottom: 5,
    fontWeight: '100',
    fontFamily: 'Helvetica'
  },

  listingMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25,
  }

});

module.exports = MyScheduleScreen
