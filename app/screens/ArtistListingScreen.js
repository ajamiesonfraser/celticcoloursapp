'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import axios from 'axios'
import ListingScreen from './ListingScreen'
import Client from '../services/Client'

class ArtistListingScreen extends Component {
  render() {
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar navTitle='Artists'/>
        <ListingScreen
          listData={Object.keys(Client.data.artists).map((key) => {
            return { urlData: Client.getArtistById(key) }
          })}
          renderItemPicture={(listing, style) => {
            return (
              <Image style={style} source={{uri: listing.urlData.web_photo_url}}/>
            )
          }}
          renderItem={(listing, style) => {
            return (
              <View style={style}>
                <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'}>{listing.urlData.name}</Text>
                <Text style={styles.homebase}>{listing.urlData.homebase}</Text>
              </View>
            )
          }}
          onItemPress={(listing) => {
            this._navigateToArtistDetail(listing)
          }}
        />
      </ViewContainer>
    )
  }

  _navigateToArtistDetail(listing) {
    this.props.navigator.push({
      ident: "ArtistDetail",
      passProps: {
        urlData:listing.urlData
      }
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
  listingInfo:{
    flexDirection: "column",
    width:200,
    marginTop: 15
  },
  homebase: {
    marginLeft: 15,
    paddingBottom: 5,
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 100
  },
  listingName: {
    flexDirection: 'column',
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

module.exports = ArtistListingScreen
