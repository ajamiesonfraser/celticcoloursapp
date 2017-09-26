'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, TouchableOpacity, ListView } from 'react-native'
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Circle'
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
          <Image indicator={ProgressBar} style={styles.artistPicture} source={{uri: listing.web_photo_url}}/>
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
        <View>
          <Text style={styles.performingTitle}>Performing Artists</Text>
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
        </View>
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
        {this.renderPerformerList()}
      </DetailScreen>
		)
	}
  _navigateToArtistDetail(listing) {
    this.setState({ currentArtistDetail: listing })
  }
}

const styles = StyleSheet.create ({
  performingTitle:{
    textAlign:'center',
    marginVertical: 10,
    fontSize:18,
    fontWeight: 'bold',
    color: '#C7C7CD'
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
  }
})

module.exports = EventDetailScreen