'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet, Image, Button } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import GetDirectionsButton from '../components/GetDirectionsButton'
import axios from 'axios'

class MyScheduleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artistName: []
    }
  }
  componentDidMount(){
    axios.get('https://novastream.ca/xml2json.php?org=23324&type=shows&field=name,formatted_date,poster_url,formatted_start_time,venue_name,venue,seating,price,description_public,performances')
    .then((response) => {
      var aList = response.data
      // console.log(aList)
      Object.keys(aList).map((artist) => { 
        this.setState({
          artistName : this.state.artistName.concat([{
              listingName: aList[artist].name, 
              id: aList[artist].id, 
              startTime: aList[artist].formatted_start_time, 
              listingPicture: aList[artist].poster_url,
              listingDate: aList[artist].formatted_date,
              listingVenue: aList[artist].venue_name,
              listingCommunity:aList[artist].venue[0].community,
              latitude: aList[artist].venue[0].latitude,
              longitude: aList[artist].venue[0].longitude,
              googleAddress: aList[artist].venue[0].google_maps_link,
              listingPrice: aList[artist].price,
              listingSeating: aList[artist].seating,
              description: aList[artist].description_public,
          }])
        })
      })
    })
    .done()
  }
  
  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToEventDetail(listing) }>
        <Image style={styles.listingPicture} source={{uri: listing.listingPicture}}/>
        <View style={styles.listingInfo}>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{`${(listing.listingName)}`}</Text>
          <Text style={styles.listingDate}>{`${(listing.listingDate)}`}</Text>
          <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{`${(listing.listingVenue)}`}</Text>
        </View>
        <Text style={styles.startTime}>{`${(listing.startTime)}`}</Text>
        <GetDirectionsButton
          mapUrl={`${listing.googleAddress}`}/>
      </TouchableOpacity>

    )
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar 
        navTitle = "My Schedule"/>
        <ListView
          pageSize={1}
          initialListSize={20}
          scrollRenderAheadDistance={500}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.state.artistName)}
          renderRow={(listing) => {
            return this._renderListingRow(listing)
          }}  
        />
      </ViewContainer>
    )
  }


  

  _navigateToEventDetail(listing) {
    this.props.navigator.push({
      ident: "EventDetail",
      passProps: {
        listingName:`${listing.listingName}`,
        listingDate:`${listing.listingDate}`,
        listingVenue:`${listing.listingVenue}`,
        listingPicture:`${listing.listingPicture}`,
        listingCommunity:`${listing.listingCommunity}`,
        startTime:`${listing.startTime}`,
        listingPrice:`${listing.listingPrice}`,
        listingSeating:`${listing.listingSeating}`,
        longitude: `${listing.longitude}`,
        latitude: `${listing.latitude}`,
        description: `${listing.description}`,
        performer: `${listing.performer}`
      },
      listing
    })
  }

}

const styles = StyleSheet.create({
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
    backgroundColor: 'blue',
    height: 50,
    width:75,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginTop: 10
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
