'use strict'
import React, { Component} from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Text,
  View,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Picker
} from 'react-native'
import CheckBox from 'react-native-check-box'
import Button from 'react-native-button'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import GetDirectionsButton from '../components/GetDirectionsButton'
import axios from 'axios'
import Modal from 'react-native-modal'
import ModalDropdown from 'react-native-modal-dropdown'
import ListingScreen from './ListingScreen'

import Client from '../services/Client'

const dateOptions = [ "Friday, Oct. 6", "Saturday, Oct. 7", "Sunday, Oct. 8", "Monday, Oct. 9", "Tuesday, Oct. 10", "Wednesday, Oct. 11", "Thursday, Oct. 12", "Friday, Oct. 13", "Saturday, Oct. 14" ]

const FilterTypes = {
  ALL: 'all',
  CONCERTS: 'concerts',
  WORKSHOPS: 'workshops'
}

class MyScheduleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],

      showConcerts: true,
      showWorkshops: true,

      showingTypeFilterModal: false,
      showingDateFilterModal: false,
      // changedData: []
    }
  }

  componentDidMount() {
    this.dataLoadedHandler = Client.events.addListener('data loaded', (data) => {
      const { artists, shows } = data

      console.log({ shows, artists })

      //const listData = Object.keys(shows).map(showId => ({ urlData: shows[showId] }))

      var listData = []
      for (var id in shows) {
        listData = listData.concat([{
          urlData: shows[id]
        }])
      }

      this.setState({
        listData,
        artists,
        shows
      })
    })

    Client.loadData()
  }

  componentWillUnmount() {
    this.dataLoadedHandler.remove()
  }
  
  _renderListingRow(listing, i) {
    return (
      <TouchableOpacity
        style={i % 2 != 0 ? styles.listingRow : StyleSheet.flatten([styles.listingRow, { backgroundColor: '#fafafa' }])}
        onPress={(event) => this._navigateToEventDetail(listing) }
        key={i}
      >
        <View style={styles.listingPictureWrapper}>
          <Image style={styles.listingPicture} source={{uri: listing.urlData.poster_url}}/>
        </View>
        <View style={styles.listingInfo}>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.name}</Text>
          <Text style={styles.listingDate}>{listing.urlData.formatted_date}</Text>
          <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.venue_name}</Text>
        </View>
        <Text style={styles.startTime}>{listing.urlData.formatted_start_time}</Text>

        {/* <View style={styles.buttonsRow}>
          <Button containerStyle={styles.buttonContainerStyle} style={styles.buttonStyle}>
            View Event
          </Button>

          <GetDirectionsButton mapUrl={listing.urlData.venue[0].google_maps_link}/>
        </View> */}
      </TouchableOpacity>

    )
  }

  // _changeDateSaturday(){
  //   this.setState({
  //     changedData: grouped['2017-10-07']
  //   })
  // }

  renderTypeFilterModal() {
    const oldState = {
      showConcerts: this.state.showConcerts,
      showWorkshops: this.state.showWorkshops
    }

    return (
      <Modal isVisible={this.state.showingTypeFilterModal}>
        <View style={styles.modal}>
          <Text style={{
            textAlign: 'center',
            fontSize: 16
          }}>
            Select which types of events you want to see.
          </Text>

          <View style={{
            marginVertical: 25
          }}>
            <CheckBox
              rightText='Concerts'
              isChecked={this.state.showConcerts}
              onClick={() => this.setState({ showConcerts: !this.state.showConcerts })}
            />

            <CheckBox
              rightText='Workshops'
              isChecked={this.state.showWorkshops}
              onClick={() => this.setState({ showWorkshops: !this.state.showWorkshops })}
            />
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Button
              containerStyle={styles.buttonPrimaryContainerStyle}
              style={styles.buttonPrimaryStyle}
              onPress={() => {
                this.setState({
                  showingTypeFilterModal: false
                })
              }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const currentListData = this.state.listData
    console.log({ currentListData })

    switch (this.state.filterMode) {
      case FilterTypes.CONCERTS:
        break
      case FilterTypes.WORKSHOPS:
        break
    }

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar navTitle="My Schedule"
          rightButton={
            <ModalDropdown 
              options={dateOptions}
              // onPress={() => this._changeDateSaturday}
              // onSelect={(idx, value) => this._changeDateSaturday}
            >
              <Icon
                style={styles.buttonIcon}
                name="angle-down" size={35}
              />
            </ModalDropdown>}
        />

        <View style={{
          height: 40
        }}>
        
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Button
              containerStyle={styles.filterButtonContainerStyle}
              style={styles.filterButton}
              onPress={() => {
                this.setState({
                  showingTypeFilterModal: true
                });
              }}
            >
              Type
            </Button>
            <Button containerStyle={styles.filterButtonContainerStyle} style={styles.filterButton}>
              Date
            </Button>
            <Button containerStyle={styles.filterButtonContainerStyle} style={styles.filterButton}>
              Region
            </Button>
          </View>
        </View>

        {this.renderTypeFilterModal()}

        {this.state.shows != null && this.state.artists != null
          ? <ListingScreen
              listData={this.state.listData}
              renderItemPicture={(listing, style) => {
                return (
                  <Image style={style} source={{uri: listing.urlData.poster_url}}/>
                )
              }}
              renderItem={(listing, style) => {
                console.log('render item: ', listing)
                return (
                  <View style={style}>
                    <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.name}</Text>
                    <Text style={styles.listingDate}>{listing.urlData.formatted_date}</Text>
                    <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.venue_name}</Text>
                  </View>
                )
              }}
              getItemRightText={(listing) => {
                return listing.urlData.formatted_start_time
              }}
              onItemPress={(listing) => {
                this._navigateToEventDetail(listing)
              }}
            />
          : <ActivityIndicator size={'large'}/>}
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
  modal: {
    backgroundColor: 'white',
    marginTop: 50,
    padding: 22,
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: 'red'
  },
  listingInfo:{
    flex: 1,
    flexDirection: "column"
  },
  startTime: {
    marginRight: 5,
    flexDirection: "column",
    color: "#F6655E",
    fontSize: 17
  },
   listingDate: {
    paddingBottom: 5,
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  listingVenue: {
    color: '#0076FF',
    paddingBottom: 5,
    fontSize: 11
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: 'center',
    paddingVertical: 10
  },
  listingPictureWrapper: {
    flex: 0,
    alignItems: 'center',
    marginHorizontal: 15
  },
  listingPicture:{
    backgroundColor: '#9B9B9B',
    height: 50,
    width: 50,
    marginBottom: 5,
    alignSelf: 'flex-start',
    borderRadius: 5
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
  },

  buttonContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3d97e8'
  },

  buttonStyle: {
    fontSize: 14,
    color: '#3d97e8'
  },

  buttonPrimaryContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#3d97e8',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3d97e8'
  },

  buttonPrimaryStyle: {
    fontSize: 14,
    color: '#fff'
  },

  buttonsRow: {
    justifyContent: 'flex-start',
    flexDirection: "row",
  },

  filterButtonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3d97e8'
  },

  filterButton: {
    flex: 1,
    fontSize: 14,
    color: '#3d97e8',
  }

});

module.exports = MyScheduleScreen
