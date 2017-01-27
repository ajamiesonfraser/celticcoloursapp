'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import TestData from '../components/TestData'
import axios from 'axios'



const listings = [
  {listingName: "Ceilidh Experience", id: 1},
  {listingName: "Step Into the Past", id: 2},
  {listingName: "Celtic Cabaret", id: 3},
  {listingName: "Dynamic Duos", id: 4},
  {listingName: "Whycocomagh Gathering", id: 5}
]

class MyScheduleScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      artistName:[],
      listingsDataSource: ds.cloneWithRows(listings).bind(this)
    }
  }
  componentDidMount(){
    axios.get('https://novastream.ca/xml2json.php?org=23324&type=artists')
    .then((response) => {
      console.log(response.data)
      var aList = response.data
      aList.map((artist) => { 
        this.setState({
          artistName : this.state.artistName.concat([artist])
        })
      })
      console.log(this.state.artistName)
      console.log(response.status)
    })
  }
  

  render() {
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar 
        navTitle = "My Schedule"/>
        <ListView
          initialListSize={10}
          dataSource={this.state.listingsDataSource}
          renderRow={(listing) => {
            return this._renderListingRow(listing)
          }} 
        />
      </ViewContainer>
    )
  }


  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToListingShow(listing) }>
        <Text style={styles.listingName}>{`${_.capitalize(listing.listingName)}`}</Text>
        <Text>{this.state.artistName.length}</Text>
        {this.state.artistName.map((artist) => {<Text>{artist.name}</Text>})}
        <View style={{flex: 1}} />
        <Icon name="chevron-right" style={styles.listingMoreIcon} />
      </TouchableOpacity>
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
  },

  listingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50
  },

  listingName: {
    marginLeft: 25
  },

  listingMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25,
  }

});

module.exports = MyScheduleScreen
