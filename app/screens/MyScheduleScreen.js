'use strict'
import React, { Component} from 'react'
import {AsyncStorage, Text, View, ListView, TouchableOpacity, StyleSheet, Image, Button } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import GetDirectionsButton from '../components/GetDirectionsButton'
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown'

const dateOptions = [ {"name":"Friday, Oct. 7", "age":30}, {"name":"Saturday, Oct. 8", "age":31}, {"name":"Sunday, Oct. 9", "age":32}]


class MyScheduleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      changedData: []
    }
  }

  componentDidMount(){
    axios.get('https://novastream.ca/xml2json.php?org=23324&type=shows&local=yes&field=name,formatted_date,date,poster_url,formatted_start_time,venue_name,venue,seating,price,description_public,performances')
    .then((response) => {
      var aList = response.data
      var listData = []
        for (var artist in aList) {
          listData = listData.concat([{
             urlData:aList[artist]
          }])
      }
      var grouped = _.groupBy(listData, function(item){
      return item.urlData.date
      })
      // var changedData = grouped['2016-10-11']
      this.setState({
        listData:listData,
        changedData:changedData})
    })
    .done()
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

  render() {
    console.log('schedule is rendering')
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar 
        navTitle = "My Schedule"
        rightButton={
          <ModalDropdown 
            options={dateOptions}
            onSelect={(idx, value) => this._changeDate}>
            <Icon
              style={styles.buttonIcon}
              name="angle-down" size={35} />
          </ModalDropdown>
        }
        />
        <ListView
          pageSize={1}
          initialListSize={5}
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
