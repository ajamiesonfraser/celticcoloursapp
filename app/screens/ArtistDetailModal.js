'use strict'

import React, { Component } from 'React'
import {
  Button,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ListView
} from 'react-native'
import Modal from 'react-native-modal'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'
import ArtistDetail from './ArtistDetail'


class ArtistDetailModal extends Component {
  static propTypes = {
    artist: React.PropTypes.object.isRequired,
    onModalClose: React.PropTypes.func.isRequired
  }

  renderModalBottom() {
    return (
      <View style={{
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Button
          title='Close'
          onPress={this.props.onModalClose}
        />
      </View>
    );
  }

	render() {
    const htmlReplaced = this.props.artist.bio_public.replace(/<i>/g, '').replace(/<\/i>/g, '')

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <Modal isVisible={true} onRequestClose={this.props.onModalClose}>
        <View>
          <View style={styles.contentDetail}>
            <ScrollView>
              <ArtistDetail artist={this.props.artist}/>
            </ScrollView>
            {this.renderModalBottom()}
          </View>
        </View>
      </Modal>
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

module.exports = ArtistDetailModal