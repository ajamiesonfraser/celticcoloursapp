'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ListView } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'

class ArtistDetailScreen extends Component {

  _renderListingRow(listing) {
    return (
      <TouchableOpacity style={styles.listingRow}>
        <View style={styles.listingInfo}>
          <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.shows}</Text>
        </View>
        <View style={{flex: 1}} />
      </TouchableOpacity>
    )
  }

	render(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return(
			<ViewContainer>
        <Navbar 
        	navTitle = {this.props.listingName}
        	backButton = {
          	<TouchableOpacity style={styles.navBack} onPress={() => this.props.navigator.pop() }>
          		<Icon name="angle-left" size={25} style={{marginTop:10}}/>
          	</TouchableOpacity>
        	}
        />
        <StatusBarBackground/>   
        <ScrollView>
        <View style={styles.contentDetail}>
          <Image style={styles.listingPicture} source={{uri: this.props.profilePicture}}/>
          <Text style={styles.listingName}>{this.props.listingName}</Text>
          <Text style={styles.homebase}>{this.props.homebase}</Text>
          <Text style={styles.description}>{this.props.bio}</Text>
        </View>
        <ListView
          pageSize={1}
          initialListSize={5}
          scrollRenderAheadDistance={1}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.props.artistName)}
          renderRow={(listing) => {
            return this._renderListingRow(listing)
          }} 
        />
        </ScrollView>
      </ViewContainer>
        
		)
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
    paddingBottom: 5,
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
  contentRow:{
    flexDirection: 'row'
  },
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  listingName:{
    fontSize: 28,
    paddingBottom: 20,
    fontWeight: '100',
    fontFamily: 'Helvetica'
  },
  listingPicture:{
    backgroundColor: 'blue',
    height: 200,
    width:300,
    marginBottom: 15
  },
  listingInfo:{
    flexDirection: "column",
    width:200,
    marginTop: 15
  },
})

module.exports = ArtistDetailScreen