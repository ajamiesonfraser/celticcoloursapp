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
  Picker
} from 'react-native'

import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Circle'
import ModalDropdown from 'react-native-modal-dropdown'
import CheckBox from 'react-native-check-box'
import Button from 'react-native-button'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import Modal from 'react-native-modal'
import ListingScreen from './ListingScreen'
import NoItineraryItemsScreen from './NoItineraryItemsScreen'

import Client from '../services/Client'

const dateOptions = [ "Friday, Oct. 6", "Saturday, Oct. 7", "Sunday, Oct. 8", "Monday, Oct. 9", "Tuesday, Oct. 10", "Wednesday, Oct. 11", "Thursday, Oct. 12", "Friday, Oct. 13", "Saturday, Oct. 14" ]

/** NOTE: in JS, month numbers start at zero, so we use 9 even though it is the 10th month */
const EVENT_DATES = [
  '2017-10-06',
  '2017-10-07',
  '2017-10-08',
  '2017-10-09',
  '2017-10-10',
  '2017-10-11',
  '2017-10-12',
  '2017-10-13',
  '2017-10-14',
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
  WORKSHOPS: 'community events'
}

const stringDateToFormattedDate = (stringDate, includeYear=true) => {
  const [year, month, day] = stringDate.split('-').map(x => parseInt(x, 10))
  const dateObject = new Date(year, month - 1, day)
  
  let str = `${DAYS_OF_WEEK[dateObject.getDay()]} ${MONTH_NAMES[dateObject.getMonth()]} ${dateObject.getDate()}`

  if (includeYear) {
    str += ` ${dateObject.getFullYear()}`
  }

  return str
}

class EventListingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],

      currentListData: null,
      regionFilterListData:[],

      
      typeFilter: FilterTypes.ALL,
      dateFilter: 'all',
      regionFilter: 'all',

      showingTypeFilterModal: false,
      showingDateFilterModal: false,

    }
  }

  componentDidMount() {
    this.dataLoadedHandler = Client.events.addListener('data loaded', (data) => {
      const { artists, workshops, shows } = data

      const listData = Object.keys(shows).map(showId => {
        return { urlData: { id: showId, ...shows[showId] }, type: 'show' }
      }).concat(Object.keys(workshops).map(workshopId => {
        return { urlData: { id: workshopId, ...workshops[workshopId] }, type: 'workshop' }
      }))

      let regionFilterListData = ['all'];
      for(var i = 0 ; i < listData.length ; i++){
        let customFields = listData[i].urlData['custom-fields'][0];
        let customField = customFields['custom-field'][0]
        let value = customField['value']
        let flag = true;

        for(var j = 0 ; j < regionFilterListData.length ; j++){
          if(value == regionFilterListData[j]){
            flag = false;
            break;
          }
        }

        if(flag){
          regionFilterListData.push(value);
        }
      }

      this.setState({
        artists,
        shows,
        listData,
        currentListData: listData,
        regionFilterListData
      })
    })

    Client.loadData()
  }

  componentWillUnmount() {
    this.dataLoadedHandler.remove()
  }

  _applyFilters() {
    let listData = this.state.listData   

    const filteredByType = listData.filter((el) => {
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

      // console.log('showing el.type = ' + el.type);

      return true
    })

    // console.log('this.state.dateFilter : ', this.state.dateFilter)

    const filteredByDate = (this.state.dateFilter != 'all' && this.state.dateFilter != null)
      ? filteredByType.filter(x => this.state.dateFilter == x.urlData.date)
      : filteredByType

    
     let filterdByRegion = [];
    if(this.state.regionFilter == 'all'){
      filterdByRegion = filteredByDate;
    }else{
      for(var i = 0 ; i < filteredByDate.length ; i++){
        let customFields = listData[i].urlData['custom-fields'][0];
        let customField = customFields['custom-field'][0]
        let value = customField['value']
        if(this.state.regionFilter == value){
          filterdByRegion.push(filteredByDate[i]);
        }
      }
    }

    this.setState({
      currentListData: filterdByRegion
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
          <Image indicator={ProgressBar} style={styles.listingPicture} source={{uri: listing.urlData.poster_url}}/>
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


  renderFilterBar() {
    return (
      <View style={{
        height: 40
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>          
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
            }}>

            <ModalDropdown
              defaultIndex={0}
              options={['Concerts & Events', 'Official Concerts', 'Community Events']}
              style={styles.filterButtonContainerStyle}
              textStyle={styles.filterButton}
              onSelect={(idx, value) => {
                let typeValue;

                switch (value) {
                  case 'Concerts & Events':
                    typeValue = FilterTypes.ALL;
                    break;
                  case 'Official Concerts':
                    typeValue = FilterTypes.CONCERTS;
                    break;
                  case 'Community Events':
                    typeValue = FilterTypes.WORKSHOPS;
                    break;
                }

                  this.setState({
                    typeFilter: typeValue
                  }, () => {
                  this._applyFilters() 
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
            </ModalDropdown>

            <ModalDropdown
              defaultIndex={0}
              options={['all'].concat(EVENT_DATES.map(x => stringDateToFormattedDate(x, false)))}
              style={styles.filterButtonContainerStyle}
              textStyle={styles.filterButton}
              onSelect={(idx, value) => {
                this.setState({
                  dateFilter: value != 'all'
                    ? EVENT_DATES[idx - 1] // -1 is for 'all' option being first
                    : value
                }, () => {
                this._applyFilters() 
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
            </ModalDropdown>

            <ModalDropdown
              defaultIndex={0}
              options={this.state.regionFilterListData}
              style={styles.filterButtonContainerStyle}
              textStyle={styles.filterButton}
              onSelect={(idx, value) => {
                this.setState({
                  regionFilter:value
                }, () => {
                this._applyFilters() 
                })
              }}
              >
              <View style={styles.filterButtonContent}>
                <Text style={styles.buttonText}>Region</Text>
                <Icon
                  style={styles.filterDropdownIcon}
                  name="angle-down" size={18}
                />
              </View>
            </ModalDropdown>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const listDataByDate = {}

    if (this.state.currentListData != null) {
      this.state.currentListData.forEach((el) => {
        if (el.urlData.date != null) {
          const [year, month, day] = el.urlData.date.split('-')
          const dateObject = new Date(year, month - 1, day)
          //const dateFormatted = `${DAYS_OF_WEEK[dateObject.getDay()]}, ${MONTH_NAMES[dateObject.getMonth()]} ${dateObject.getDate()}`

          if (!listDataByDate[el.urlData.date]) {
            listDataByDate[el.urlData.date] = []
          }

          listDataByDate[el.urlData.date].push(el)
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

    // console.log({listDataByDate})

    return (
      <ViewContainer style={{backgroundColor:'white'}}>       

        {this.renderTypeFilterModal()}
        {this.renderFilterBar()}       

        <ListingScreen
          listData={listDataByDate}
          renderItemPicture={(listing, style) => {
            return (
              <Image
                indicator={ProgressBar}
                source={{uri: listing.urlData.poster_url}}
                style={style}
              />
            )
          }}
          renderItem={(listing, style) => {
            return (
              <View style={style}>
                <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.name}</Text>
                <Text style={styles.listingDate} numberOfLines={1} ellipsizeMode={'tail'}>{listing.urlData.formatted_date + " " + listing.urlData.formatted_start_time}</Text>
                <Text style={styles.listingVenue} numberOfLines={1} ellipsizeMode={'tail'} >{listing.urlData.venue_name}</Text>
              </View>
            )
          }}
          getItemRightText={(listing) => {
            return listing.urlData.formatted_start_time
          }}
          getSectionHeaderText={(sectionData) => {
            {/* console.log('sectionData = ', sectionData); */}

            if (sectionData.length != 0) {
              return sectionData[0].urlData.formatted_date
            }
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
    
    let filterType = "";
    
    if(this.state.typeFilter == FilterTypes.ALL){
      filterType = "Concerts & Events";
    }else if(this.state.typeFilter == FilterTypes.CONCERTS){
      filterType = "Official Concerts";
    }else if(this.state.typeFilter == FilterTypes.WORKSHOPS){
      filterType = "Community Events";
    }

    let title = listing.urlData.name;
    title = title.length > 25 ? (title.substring(0, 25) + "...") : title;

    this.props.navigator.push({
      ident: "EventDetail",
      title: title,
      passProps: {
        urlData:listing.urlData,
        filterType:filterType
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
    color: "#636363",
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
    fontWeight: '400',
    color: '#8f8294',
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
    fontSize: 12,
    color: '#fff'
  },
  
  buttonStyle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700'
  },

  navbarButtonContainer: [],

  buttonContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#F57373',
    borderRadius: 3
  },
  
  buttonText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#FD3443'
  },

  filterButtonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
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
  },

});

styles.navbarButtonContainer = [styles.buttonContainerStyle, {
  marginVertical: 8
}]

module.exports = EventListingScreen