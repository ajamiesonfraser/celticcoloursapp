import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, ListView } from 'react-native'
import HTML from 'react-native-render-html'
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
})

module.exports = EventDetail