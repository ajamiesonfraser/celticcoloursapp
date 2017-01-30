'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
          artistName : this.state.artistName.concat([{listingName: artist.name, id: artist.id, startTime: artist.formatted_start_time, listingPicture: artist.poster_url}])
        })
      })
    })
    .done()
  }
  
  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToListingShow(listing) }>
        <Image style={styles.listingPicture} source={{uri: listing.listingPicture}}/>
        <Text style={styles.listingName}>{`${(listing.listingName)}`}</Text>
        <View style={styles.startTime}>
          <Text>{`${(listing.startTime)}`}</Text>
        </View>
        <View style={{flex: 1}} />
        <Icon name="chevron-right" style={styles.listingMoreIcon} />
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
          initialListSize={10}
          dataSource={ds.cloneWithRows(this.state.artistName)}
          renderRow={(listing) => {
            return this._renderListingRow(listing)
          }} 
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
  },
  startTime: {
    marginLeft: 25,
    justifyContent:"flex-start",
    flexDirection:"row"
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 100
  },
  listingPicture:{
    backgroundColor: 'blue',
    height: 60,
    width:90,
    marginLeft: 25
  },
  listingName: {
    marginLeft: 25,
    flexDirection: 'column'
  },

  listingMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25,
  }

});

module.exports = MyScheduleScreen
