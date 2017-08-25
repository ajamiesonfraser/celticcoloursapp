'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ListView } from 'react-native'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'
import ArtistDetail from './ArtistDetail'
import DetailScreen from './DetailScreen'
import EventDetailModal from './EventDetailModal'
import Client from '../services/Client'

class ArtistDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEventDetail: null
    }
  }

  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow} onPress={(event) => this._navigateToEventDetail(listing) }>
        <Image style={styles.showPicture} source={{uri: listing.poster_url}}/>
        <View style={styles.listingInfo}>
          <Text style={styles.listingItem} numberOfLines={1} ellipsizeMode={'tail'}>{listing.name}</Text>
        </View>
        <View style={{flex: 1}} />
      </TouchableOpacity>
    )
  }

  renderPerformanceList() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

    return (
      <ListView
        pageSize={1}
        initialListSize={5}
        scrollRenderAheadDistance={1}
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(this.props.urlData.shows[0])}
        renderRow={(listing) => {
          return (
            <View>
              {listing.map((el, i) => {
                const realListing = Client.getShowById(el.id)
                return this._renderListingRow(realListing)
              })}
            </View>
          );
        }} 
      />
    )
  }

  renderEventDetailModal() {
    if (this.state.currentEventDetail != null) {
      const event = this.state.currentEventDetail

      return (
        <EventDetailModal
          event={event}
          onViewEventPress={() => {
            this.setState({ currentEventDetail: null }, () => {
              this.props.navigator.push({
                ident: 'EventDetail',
                passProps: {
                  urlData: event
                }
              })

              /*Client.events.emit('switch tab', {
                name: 'tab1',
                passProps: {
                  urlData: event
                }
              })*/
            })
          }}
          onModalClose={() => {
            this.setState({ currentEventDetail: null })
          }}
        />
      )
    }
  }

	render(){
    return (
      <DetailScreen {...this.props}>
        {this.renderEventDetailModal()}
        <ArtistDetail artist={this.props.urlData}/>

        <Text style={styles.performancesTitle}>Upcoming Performances</Text>
        {this.renderPerformanceList()}
      </DetailScreen>
		)
	}

  _navigateToEventDetail(listing) {
    // NOTE: listing is full object, not just nested object
    this.setState({
      currentEventDetail: listing
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
  homebase: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
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
  performancesTitle:{
    marginVertical: 10,
    fontSize:18,
    fontWeight: 'bold',
    color: '#C7C7CD'
  },
  contentRow:{
    flexDirection: 'row'
  },
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  showPicture:{
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
  listingInfo:{
    flexDirection: "column",
    width:200,
    marginTop: 15
  },
})

module.exports = ArtistDetailScreen