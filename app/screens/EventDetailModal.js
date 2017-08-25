'use strict'

import React, { Component } from 'React'
import {
  StyleSheet,
  View,
  ScrollView,
  ListView
} from 'react-native'
import Button from 'react-native-button'
import Modal from 'react-native-modal'
import EventDetail from './EventDetail'


class EventDetailModal extends Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    onViewEventPress: React.PropTypes.func.isRequired,
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
          containerStyle={styles.buttonPrimaryContainerStyle}
          style={styles.buttonPrimaryStyle}
          onPress={this.props.onViewEventPress}
        >
          View Event
        </Button>
        <Button
          containerStyle={styles.buttonContainerStyle}
          style={styles.buttonStyle}
          onPress={this.props.onModalClose}
        >
          Close
        </Button>
      </View>
    );
  }

	render(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

    return(
      <Modal isVisible={true} onRequestClose={this.props.onModalClose}>
        <View>
          <View style={styles.contentDetail}>
            <ScrollView>
              <EventDetail showDetails={false} event={this.props.event}/>
            </ScrollView>
            {this.renderModalBottom()}
          </View>
        </View>
      </Modal>
		)
	}
}

const styles = StyleSheet.create ({
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
    marginTop: 50,
    padding: 22,
    borderRadius: 5
  },
  
  buttonContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3d97e8'
  },

  buttonStyle: {
    fontSize: 14,
    color: '#3d97e8'
  },
  
  buttonPrimaryContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#3d97e8',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3d97e8'
  },

  buttonPrimaryStyle: {
    fontSize: 14,
    color: '#fff'
  }
})

module.exports = EventDetailModal