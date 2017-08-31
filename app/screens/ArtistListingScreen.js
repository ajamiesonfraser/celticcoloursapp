'use strict'
import React, { Component} from 'react'
import {Text, View, ListView,StyleSheet, Image } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'
import ListingScreen from './ListingScreen'
import Client from '../services/Client'

class ArtistListingScreen extends Component {
  render() {
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
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
  homebase: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  listingName: {
    flexDirection: 'column',
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
    fontFamily: 'Helvetica'
  }
});

module.exports = ArtistListingScreen
