import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ListView } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'

class EventDetail extends Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    showDetails: React.PropTypes.bool
  }

  static defaultProps = {
    showDetails: true
  }

	render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <View>
        <Image style={styles.listingPicture} source={{uri: this.props.event.poster_url}}/>
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
            <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'} >{this.props.event.venue_name}</Text>
            <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.event.venue[0].community}</Text>
            <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.event.price} {this.props.event.seating}</Text>
          </View>
        </View>
        {this.props.showDetails
          ? <GetDirectionsButton
              mapUrl={this.props.event.venue[0].google_maps_link}
            />
          : null}
        {this.props.showDetails
          ? <HTML html={this.props.event.description_public}/>
          : null}
      </View>
		)
	}
  _navigateToArtistDetail(listing) {
    this.props.navigator.push({
      ident: "ArtistDetail",
      passProps:{
        urlData: listing
      }
    })
  }
}

const styles = StyleSheet.create ({
  description:{
    margin:30,
    fontFamily: 'Helvetica',
    fontWeight:'100'
  },
  navBack:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  },
  detailData:{
    fontFamily: 'Helvetica',
    fontWeight:'100',
    fontSize:12,
    marginBottom: 10,
    width: 175
  },
  performingTitle:{
    flex: 1,
    fontSize:18,
    fontWeight: 'bold',
    color: '#C7C7CD',
    marginBottom: 10
  },
  detailCategory:{
    fontSize:12,
    fontWeight: 'bold',
    color: '#C7C7CD',
    marginRight: 10,
    marginBottom:10
  },
  artistPicture:{
    backgroundColor: '#9B9B9B',
    height: 50,
    width:75,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 5
  },
  contentRow:{
    flexDirection: 'row'
  },
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70
  },
  listingInfo:{
    flexDirection: "column",
    width:200,
    marginTop: 15
  },
  listingItem: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    marginBottom: 5
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
    width:300,
    marginBottom: 15,
    borderRadius: 5
  },
})

module.exports = EventDetail