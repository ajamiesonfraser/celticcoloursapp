import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalDropdown from 'react-native-modal-dropdown'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'

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

const stringDateToFormattedDate = (stringDate, includeYear=true) => {
  const [year, month, day] = stringDate.split('-').map(x => parseInt(x, 10))
  const dateObject = new Date(year, month - 1, day)
  
  let str = `${DAYS_OF_WEEK[dateObject.getDay()]} ${MONTH_NAMES[dateObject.getMonth()]} ${dateObject.getDate()}`

  if (includeYear) {
    str += ` ${dateObject.getFullYear()}`
  }

  return str
}

class Screen extends Component {
  static propTypes = {
    navTitle: React.PropTypes.string.isRequired,
    canGoBack: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.func
    ]).isRequired,
    onBack: React.PropTypes.func.isRequired,
    navbar: React.PropTypes.bool
  }

  static defaultProps = {
    navbar: false
  }

  constructor(props) {
    super(props)
    this.state = { 
      dateFilter: 'all',

    }
  }

  _applyFilters(){
    const filteredByDate = (this.state.dateFilter != 'all' && this.state.dateFilter != null)
    ? this.props.markers.filter(x => 
      this.state.dateFilter == x.markerData.date
    )
    : this.props.markers

    this.props.onMarkersChange(filteredByDate);
  }

  render() {
    return (
      <ViewContainer>
        {this.props.navbar
          ? <Navbar 
              navTitle={this.props.navTitle}
              backButton={
                ((typeof this.props.canGoBack === 'function' && this.props.canGoBack()) || this.props.canGoBack)
                  ? <TouchableOpacity
                      style={styles.navBack}
                      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                      onPress={this.props.onBack}
                    >
                      <Icon name="angle-left" size={35} style={{marginTop:10}}/>
                    </TouchableOpacity>
                  : null
              }
            />
          : null}
        {this.props.children}
        {
          this.props.filterBar == true ?
            <View style={{height: 40}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>          
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}/>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}/>
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
                </View>
              </View>
            </View>
          :
            null
        }
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create ({
  navBack:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
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
})

module.exports = Screen