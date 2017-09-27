'use strict'

import React, { Component } from 'React'
import {
  Button,
  StyleSheet,
  View,
  ScrollView,
  ListView
} from 'react-native'
import Modal from 'react-native-modal'
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
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
    padding: 22,
    borderRadius: 5
  }
})

module.exports = ArtistDetailModal