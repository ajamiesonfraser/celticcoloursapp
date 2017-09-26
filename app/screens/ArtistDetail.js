'use strict'

import React, { Component } from 'React'
import {
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native'
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Circle'
import Modal from 'react-native-modal'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import GetDirectionsButton from '../components/GetDirectionsButton'

class ArtistDetail extends Component {
  static propTypes = {
    artist: React.PropTypes.object.isRequired
  }

	render() {
    const htmlReplaced = this.props.artist.bio_public.replace(/<i>/g, '').replace(/<\/i>/g, '')

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return(
      <View style={styles.contentDetail}>
        <Image indicator={ProgressBar} style={styles.listingPicture} source={{uri: this.props.artist.web_photo_url}}/>
        <Text style={styles.listingName}>{this.props.artist.name}</Text>
        <Text style={styles.homebase}>{this.props.artist.homebase}</Text>
        <HTML html={htmlReplaced}/>
      </View>
		)
	}
}

const styles = StyleSheet.create ({
  homebase: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
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
  }
})

module.exports = ArtistDetail