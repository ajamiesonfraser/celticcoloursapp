'use strict'

import React, { Component } from 'React'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native'
import Button from 'react-native-button'
import Modal from 'react-native-modal'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'
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