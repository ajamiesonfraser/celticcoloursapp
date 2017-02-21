'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import axios from 'axios'



class ArtistListingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artistName: []
    }
  }
  componentDidMount(){
    axios.get('https://novastream.ca/xml2json.php?org=23324&type=artists&field=name,web_photo_url,id')
    .then((response) => {
      var aList = response.data
      Object.keys(aList).map((artist) => {
        this.setState({
          artistName : this.state.artistName.concat([{
            listingName: aList[artist].name, 
            id: artist.id, 
            profilePicture: aList[artist].web_photo_url
          }])
        })
      })
    })
    .done()
  }
  
  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToListingShow(listing) }>
        <Image style={styles.listingPicture} source={{uri: listing.profilePicture}}/>
        <Text style={styles.listingName}>{`${(listing.listingName)}`}</Text>
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
        navTitle = "Artists"/>
        <ListView
          pageSize={1}
          initialListSize={5}
          scrollRenderAheadDistance={1}
          onEndReachedThreshold={1}
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

  listingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 100
  },
  listingPicture:{
    backgroundColor: 'blue',
    height: 60,
    width:90,
    marginLeft: 25
  },
  listingName: {
    marginLeft: 15,
    flexDirection: 'column',
    width: 175,
    fontSize: 20,
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

module.exports = ArtistListingScreen
