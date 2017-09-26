import React, { Component } from 'React'
import { Linking, StyleSheet, View, Text, ListView, TouchableOpacity, Dimensions } from 'react-native'

import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Circle'
import HTML from 'react-native-render-html'
import Button from 'react-native-button'
import GetDirectionsButton from '../components/GetDirectionsButton'
import Client from '../services/Client'

var { width, height } = Dimensions.get('window');

class EventDetail extends Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    showDetails: React.PropTypes.bool
  }

  static defaultProps = {
    showDetails: true
  }

  constructor(props) {
    super(props)
    this.state = {
      isInItinerary: false
    }
  }

  componentDidMount() {
    if (Client.isEventInItinerary(this.props.event)) {
      this.setState({ isInItinerary: true })
    }
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.event.id !== this.props.event.id) {
      this.setState({
        isInItinerary: Client.isEventInItinerary(newProps.event)
      })
    }
  }

  changeScheduleStatus() {
    if (this.state.isInItinerary) {
      Client.removeEventFromItinerary(this.props.event).then(() => {
        this.setState({ isInItinerary: false });
      });
    }else{
      Client.addEventToItinerary(this.props.event).then(() => {
        this.setState({ isInItinerary: true });
      });
    }
  }

  handleClick(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  renderDetails() {
    if (this.props.showDetails) {
      console.log(this.props.event.ticket_link)
      return (
        <View>          
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={[styles.button]} onPress={()=>{
              this.handleClick(this.props.event.venue[0].google_maps_link);
              }}>
              <Text style={{color:"#0076FF", fontSize:11}}>Get Directions</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:10}} />
          <View style={{flexDirection:'row'}}>
            <View style={{width:width / 2 - 25, alignItems:'center'}}>
              <TouchableOpacity style={[styles.button, {borderColor:"#d51930"}]} onPress={()=>{
                  this.changeScheduleStatus();
                }}
                >
                {
                  this.state.isInItinerary ? 
                    <Text style={{color:"#d51930", fontSize:11}}>Added to Schedule</Text>
                  : 
                    <Text style={{color:"#d51930", fontSize:11}}>Add to Schedule</Text>
                }              
              </TouchableOpacity>
            </View>
            <View style={{width:width / 2 - 25, alignItems:'center'}}>
              <TouchableOpacity style={[styles.button, {borderColor:"#f6af39"}]} onPress={()=>{
                if(this.props.event.ticket_link != "")
                  this.handleClick(this.props.event.ticket_link);
                }}>
                <Text style={{color:"#f6af39", fontSize:11}}>By Tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingTop:10}} />
          <HTML html={this.props.event.description_public}/>
        </View>
      )
    }
  }

	render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <View style={{paddingTop:20}}>
        <Image indicator={ProgressBar} style={styles.listingPicture} source={{uri: this.props.event.poster_url}}/>
        <Text style={styles.listingName}>{this.props.event.name}</Text>
        <View style={styles.contentRow}>
          <View>
            <Text style={styles.detailCategory}>DATE</Text>
            <Text style={styles.detailCategory}>VENUE</Text>
            <Text style={styles.detailCategory}>COMMUNITY</Text>
            <Text style={styles.detailCategory}>TICKETS</Text>
          </View>
          <View style={{marginBottom:15}}>
            <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.event.formatted_date} {this.props.event.formatted_start_time}</Text>
            <Text style={[styles.detailData, {color:"#0076FF"}]} numberOfLines={1} ellipsizeMode={'tail'} >{this.props.event.venue_name}</Text>
            <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.event.venue[0].community}</Text>
            <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.event.price} {this.props.event.seating}</Text>
          </View>
        </View>
        {this.renderDetails()}
      </View>
		)
	}
  _navigateToArtistDetail(listing) {
    this.props.navigator.push({
      ident: "ArtistDetail",
      title: listing.name,
      passProps:{
        urlData: listing
      }
    })
  }
}

const styles = StyleSheet.create ({
  detailData:{
    fontFamily: 'Helvetica',
    fontWeight:'100',
    fontSize:12,
    marginBottom: 10,
    width: 175
  },
  detailCategory:{
    fontSize:12,
    fontWeight: 'bold',
    color: '#C7C7CD',
    marginRight: 10,
    marginBottom:10
  },
  contentRow:{
    flexDirection: 'row'
  },
  listingName:{
    fontSize: 20,
    fontWeight: '100',
    fontFamily: 'Helvetica',
    marginBottom: 15
  },
  listingPicture:{
    backgroundColor: 'blue',
    height: 200,
    marginBottom: 15,
    borderRadius: 5
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
  button: {
    padding: 10,
    width: width / 2 - 50,
    borderColor:"#0076FF",
    borderWidth:1,
    borderRadius:20,
    alignItems:'center'
  },
})

module.exports = EventDetail