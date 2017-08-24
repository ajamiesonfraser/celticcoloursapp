'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ListView } from 'react-native'
import HTML from 'react-native-render-html'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'
import ArtistDetailModal from './ArtistDetailModal'
import EventDetail from './EventDetail'
import DetailScreen from './DetailScreen'
import Client from '../services/Client'

class EventDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentArtistDetail: null
    }
  }

  componentDidMount() {
  }

  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToArtistDetail(listing)}>
          <Image style={styles.artistPicture} source={{uri: listing.web_photo_url}}/>
          <View style={styles.listingInfo}>
            <Text style={styles.listingItem} numberOfLines={1} ellipsizeMode={'tail'}>{listing.name}</Text>
          </View>
      </TouchableOpacity>
    )
  }
  renderPerformerList(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    if (this.props.urlData.performances && this.props.urlData.performances[0]) {
      return (
        <ListView
          dataSource={ds.cloneWithRows(this.props.urlData.performances[0])}
          renderRow={(listing) => {
            var rows = [];
            for(var i in listing) {
              rows.push(this._renderListingRow(listing[i]));
            }
            return (<View>{rows}</View>);
          }} 
        />
      );
    } else {
      return (
        <Text style={{
          fontStyle: 'italic'
        }}>
          No performances to show
        </Text>
      );
    }
  }

  renderArtistDetailModal() {
    if (this.state.currentArtistDetail != null) {
      return (
        <ArtistDetailModal
          artist={this.state.currentArtistDetail}
          onModalClose={() => {
            this.setState({ currentArtistDetail: null })
          }}
        />
      )
    }
  }

	render(){
    return(
      <DetailScreen {...this.props}>
        {this.renderArtistDetailModal()}
        <EventDetail showDetails={true} event={this.props.urlData}/>

        <Text style={styles.performingTitle}>Performing Artists</Text>
        {this.renderPerformerList()}
      </DetailScreen>
		)
	}
  _navigateToArtistDetail(listing) {
    this.setState({ currentArtistDetail: listing })
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
    marginVertical: 10,
    fontSize:18,
    fontWeight: 'bold',
    color: '#C7C7CD'
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
    marginRight: 15,
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

module.exports = EventDetailScreen