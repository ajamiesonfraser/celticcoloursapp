'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ListView } from 'react-native'
import Modal from 'react-native-modal'
import HTML from 'react-native-render-html'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'

class ArtistDetailScreen2 extends Component {
  static propTypes = {
    artist: React.PropTypes.object.isRequired,
    onModalClose: React.PropTypes.func.isRequired
  }

	render(){
    const htmlReplaced = this.props.artist.bio_public.replace(/<i>/g, '').replace(/<\/i>/g, '')

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return(
      <TouchableWithoutFeedback onPress={this.props.onModalClose}>
  			<Modal isVisible={true}>
          {/*<Navbar 
          	navTitle = {this.props.urlData.name}
          	backButton = {
            	<TouchableOpacity style={styles.navBack} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={() => this.props.navigator.pop() }>
            		<Icon name="angle-left" size={35} style={{marginTop:10}}/>
            	</TouchableOpacity>
          	}
          />
          <StatusBarBackground/>   
          <ScrollView>*/}
          <View style={styles.contentDetail}>
            <Image style={styles.listingPicture} source={{uri: this.props.artist.web_photo_url}}/>
            <Text style={styles.listingName}>{this.props.artist.name}</Text>
            <Text style={styles.homebase}>{this.props.artist.homebase}</Text>
            <HTML html={htmlReplaced}/>
            {/*<Text style={styles.description}>{this.props.urlData.bio_public}</Text>*/}
          </View>
          <View style={{height:80}} />
          {/*</ScrollView>*/}
        </Modal>
      </TouchableWithoutFeedback>
		)
	}

  _navigateToEventDetail(listing) {
    this.props.navigator.push({
      ident: "EventDetail",
      passProps: {
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
  contentRow:{
    flexDirection: 'row'
  },
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
    marginTop: 50,
    padding: 22,
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

module.exports = ArtistDetailScreen2