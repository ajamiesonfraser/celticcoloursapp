'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet, Image, Button } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
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
        <View>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{`${(listing.listingName)}`}</Text>
          <Text style={styles.listingDate}>{`${(listing.listingDate)}`}</Text>
          <Text>{`${(listing.startTime)}`}</Text>
          <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{`${(listing.listingVenue)}`}</Text>
        </View>
        <Button 
          onPress={(event) => this._navigateToListingShow(listing)}
          style={styles.directionsButton}
          title="Get Directions"
          color='#0076FF'/>
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
  directionsButton: {
    height: 50,
    width: 200,
    backgroundColor: "blue",
    flex: 1,

  },
  startTime: {
    marginRight: 5,
  },
   listingDate: {
    marginLeft: 25,
    paddingBottom: 5
  },
  listingVenue: {
    marginLeft: 25,
    width: 170,
    color: '#0076FF',
    paddingBottom: 5
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
    height: 60,
    width:90,
    marginLeft: 15
  },
  listingName: {
    marginLeft: 25,
    flexDirection: 'column',
    width: 200,
    fontSize: 17,
    paddingBottom: 5,
    fontWeight: '100'
  },

  listingMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25,
  }

});

module.exports = MyScheduleScreen
