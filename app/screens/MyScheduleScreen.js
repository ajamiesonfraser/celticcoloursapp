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
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import Modal from 'react-native-modal'
import ListingScreen from './ListingScreen'

import Client from '../services/Client'

const dateOptions = [ "Friday, Oct. 6", "Saturday, Oct. 7", "Sunday, Oct. 8", "Monday, Oct. 9", "Tuesday, Oct. 10", "Wednesday, Oct. 11", "Thursday, Oct. 12", "Friday, Oct. 13", "Saturday, Oct. 14" ]

/** NOTE: in JS, month numbers start at zero, so we use 9 even though it is the 10th month */
const EVENT_DATES = [
  new Date(2017, 9, 6),
  new Date(2017, 9, 7),
  new Date(2017, 9, 8),
  new Date(2017, 9, 9),
  new Date(2017, 9, 10),
  new Date(2017, 9, 11),
  new Date(2017, 9, 12),
  new Date(2017, 9, 13),
  new Date(2017, 9, 14)
]

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

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
      currentListData: null,

      
      typeFilter: FilterTypes.ALL,
      dateFilter: 'all',

      showingTypeFilterModal: false,
      showingDateFilterModal: false,

    }
  }

  componentDidMount() {
    this.dataLoadedHandler = Client.events.addListener('data loaded', (data) => {
      const { artists, workshops, shows } = data

      const listData = Object.keys(shows).map(showId => {
        return { urlData: shows[showId], type: 'show' }
      }).concat(Object.keys(workshops).map(workshopId => {
        return { urlData: workshops[workshopId], type: 'workshop' }
      }))

      this.setState({
        artists,
        shows,
        listData,
        currentListData: listData,
      })
    })

    Client.loadData()
  }

  componentWillUnmount() {
    this.dataLoadedHandler.remove()
  }

  _applyFilters() {
    const filteredByType = this.state.listData.filter((el) => {
      // filter by type
      if (this.state.typeFilter != FilterTypes.ALL) {
        switch (this.state.typeFilter) {
          case FilterTypes.CONCERTS:
            if (el.type != 'show') {
              return false
            }
            break
          case FilterTypes.WORKSHOPS:
            if (el.type != 'workshop') {
              return false
            }
            break
        }
      }

      return true
    })

    const filteredByDate = filteredByType.filter((el) => {
      return true
    })

    this.setState({
      currentListData: filteredByDate
    })
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
      </TouchableOpacity>
    )
  }

  renderTypeFilterModal() {
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
            <Picker
              selectedValue={this.state.typeFilter}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  typeFilter: itemValue
                }, () => {
                  this._applyFilters()
                })
              }}>


              <Picker.Item label='Concerts &amp; Events' value={FilterTypes.ALL} />
              <Picker.Item label='Official Concerts' value={FilterTypes.CONCERTS} />
              <Picker.Item label='Community events' value={FilterTypes.WORKSHOPS} />
              
            </Picker>
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

  renderDateFilterModal() {
    return (
      <Modal isVisible={this.state.showingDateFilterModal}>
        <View style={styles.modal}>
          <View>
            <Picker
              selectedValue={String(this.state.dateFilter)}
              onValueChange={(itemValue, itemIndex) => this.setState({ dateFilter: String(itemValue) })}>

              <Picker.Item
                label='All days'
                value='all'
              />
              
              {EVENT_DATES.map((el, i) => {
                return (
                  <Picker.Item
                    label={`${DAYS_OF_WEEK[el.getDay()]}, ${MONTH_NAMES[el.getMonth()]} ${el.getDate()}`}
                    value={String(el)}
                    key={i}
                  />
                )
              })}
              
            </Picker>
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
                  showingDateFilterModal: false
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
    const listDataByDate = {}

    if (this.state.currentListData != null) {
      this.state.currentListData.forEach((el) => {
        if (el.urlData.date != null) {
          const [year, month, day] = el.urlData.date.split('-')
          const dateObject = new Date(year, month - 1, day)
          const dateFormatted = `${DAYS_OF_WEEK[dateObject.getDay()]}, ${MONTH_NAMES[dateObject.getMonth()]} ${dateObject.getDate()}`

          if (!listDataByDate[dateFormatted]) {
            listDataByDate[dateFormatted] = []
          }

          listDataByDate[dateFormatted].push(el)
        }
      })

      // now work each sub-item
      for (let key in listDataByDate) {
        listDataByDate[key].sort((a, b) => {
          // compare times, date does not matter
          return Date.parse(`01/01/2011 ${a.urlData.formatted_start_time}`) - Date.parse(`01/01/2011 ${b.urlData.formatted_start_time}`)
        })
      }
    }

    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        <Navbar navTitle="My Schedule"/>

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
                })
              }}
            >
              <View style={styles.filterButtonContent}>
                <Text style={styles.buttonText}>Type</Text>
                <Icon
                  style={styles.filterDropdownIcon}
                  name="angle-down" size={18}
                />
              </View>
            </Button>
            <Button
              containerStyle={styles.filterButtonContainerStyle}
              style={styles.filterButton}
              onPress={() => {
                this.setState({
                  showingDateFilterModal: true
                })
              }}
            >
              <View style={styles.filterButtonContent}>
                <Text style={styles.buttonText}>Date</Text>
                <Icon
                  style={styles.filterDropdownIcon}
                  name="angle-down" size={18}
                />
              </View>
            </Button>
            <Button containerStyle={styles.filterButtonContainerStyle} style={styles.filterButton}>
              <View style={styles.filterButtonContent}>
                <Text style={styles.buttonText}>Region</Text>
                <Icon
                  style={styles.filterDropdownIcon}
                  name="angle-down" size={18}
                />
              </View>
            </Button>
          </View>
        </View>

        {this.renderTypeFilterModal()}
        {this.renderDateFilterModal()}

        <ListingScreen
          listData={listDataByDate}
          renderItemPicture={(listing, style) => {
            return (
              <Image style={style} source={{uri: listing.urlData.poster_url}}/>
            )
          }}
          renderItem={(listing, style) => {
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
          sections={true}
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
  modal: {
    backgroundColor: 'white',
    marginTop: 50,
    padding: 22,
    borderRadius: 5
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
  
  buttonText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#FD3443'
  },

  filterButtonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderColor: '#3d97e8'
  },

  filterButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  filterButton: {
    flex: 1,
    fontSize: 14,
    color: 'red',
  },

  filterDropdownIcon: {
    marginLeft: 5,
    color: '#FD3443'
  }

});

module.exports = MyScheduleScreen
