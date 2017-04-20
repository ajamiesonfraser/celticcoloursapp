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
      listData: []
    }
  }
  componentDidMount(){
    axios.get('https://novastream.ca/xml2json.php?org=23324&type=artists&field=name,web_photo_url,id,bio_public,homebase,shows')
    .then((response) => {
      var aList = response.data
      var listData = []
        for (var artist in aList) {
          listData = listData.concat([{
            urlData:aList[artist]
          }])
      }
      this.setState({listData:listData})
    })
    .done()
  }
    
  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToArtistDetail(listing) }>
        <Image style={styles.listingPicture} source={{uri: listing.urlData.web_photo_url}}/>
        <View style={styles.listingInfo}>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'}>{listing.urlData.name}</Text>
          <Text style={styles.homebase}>{listing.urlData.homebase}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    console.log('artist is rendering')
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar 
        navTitle = "Artists"/>
        <ListView
          pageSize={1}
          initialListSize={6}
          scrollRenderAheadDistance={1}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.state.listData)}
          renderRow={(listing) => {
            return this._renderListingRow(listing)
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
  listingPicture:{
    backgroundColor: '#9B9B9B',
    height: 60,
    width:90,
    marginLeft: 25,
    borderRadius: 5
  },
  listingName: {
    marginLeft: 15,
    flexDirection: 'row',
    width: 175,
    fontSize: 17,
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
