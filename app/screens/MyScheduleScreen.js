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
    axios.get('https://novastream.ca/xml2json.php?org=23324&type=shows')
    .then((response) => {
      var aList = response.data
      aList.map((artist) => { 
        this.setState({
          artistName : this.state.artistName.concat([{
              listingName: artist.name, 
              id: artist.id, 
              startTime: artist.formatted_start_time, 
              listingPicture: artist.poster_url,
              listingDate: artist.formatted_date,
              listingVenue: artist.venue_name
          }])
        })
      })
    })
    .done()
  }
  
  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToListingShow(listing) }>
        <Image style={styles.listingPicture} source={{uri: listing.listingPicture}}/>
        <View style={styles.listingInfo}>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{`${(listing.listingName)}`}</Text>
          <Text style={styles.listingDate}>{`${(listing.listingDate)}`}</Text>
          <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{`${(listing.listingVenue)}`}</Text>
        </View>
        <Text style={styles.startTime}>{`${(listing.startTime)}`}</Text>
        <GetDirectionsButton/>
        
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
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.state.artistName)}
          renderRow={(listing) => {
            return this._renderListingRow(listing)
          }} 
          pageSize={5}
          initialListSize={5}
        />
      </ViewContainer>
    )
  }


  

  _navigateToListingShow(listing) {
    this.props.navigator.push({
      ident: "ListingShow",
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
    fontFamily: "Helvetica"
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
    justifyContent: "flex-start",
    height: 170,
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
