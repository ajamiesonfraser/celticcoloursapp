'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ListView } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'



class EventDetailScreen extends Component {

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
    if (this.props.urlData.performances[0]) {
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
        <h2>Hey man! Log in to see this section</h2>
      );
    }
  }


	render(){
    console.log (this.props.urlData)
    
    return(
			<ViewContainer>
        <Navbar 
        	navTitle = {this.props.urlData.name}
        	backButton = {
          	<TouchableOpacity style={styles.navBack} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={() => this.props.navigator.pop() }>
          		<Icon name="angle-left" size={35} style={{marginTop:10}}/>
          	</TouchableOpacity>
        	}
        />
        <StatusBarBackground/>   
        <ScrollView>
        <View style={styles.contentDetail}>
            <Image style={styles.listingPicture} source={{uri: this.props.urlData.poster_url}}/>
            <Text style={styles.listingName}>{this.props.urlData.name}</Text>
            <View style={styles.contentRow}>
              <View>
                <Text style={styles.detailCategory}>DATE</Text>
                <Text style={styles.detailCategory}>VENUE</Text>
                <Text style={styles.detailCategory}>COMMUNITY</Text>
                <Text style={styles.detailCategory}>TICKETS</Text>
              </View>
              <View style={{marginBottom:15}}>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.urlData.formatted_date} {this.props.urlData.formatted_start_time}</Text>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'} >{this.props.urlData.venue_name}</Text>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.urlData.venue[0].community}</Text>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.urlData.price} {this.props.urlData.seating}</Text>
              </View>
            </View>
            <GetDirectionsButton
              mapUrl={this.props.urlData.venue[0].google_maps_link}
              />
            <Text style={styles.description}>{this.props.urlData.description_public}</Text>
            <Text style={styles.performingTitle}>Performing Artists</Text>

          </View>
          {this.renderPerformerList()}
          <View style={{height:80}} />
        </ScrollView>
      </ViewContainer>  
		)
	}
  _navigateToArtistDetail(listing) {
    this.props.navigator.push({
      ident: "ArtistDetail2",
      passProps:{
        urlData:listing
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

module.exports = EventDetailScreen