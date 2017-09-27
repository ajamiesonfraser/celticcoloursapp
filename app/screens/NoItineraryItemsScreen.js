import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Button from 'react-native-button'

class NoItineraryItemsScreen extends Component {
  static propTypes = {
    filterType: React.PropTypes.string,
    onViewAllEventsPress: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    filterType: 'events'
  }

  render() {
    return (
      <View style={styles.noItineraryItemsMessage}>
        <Text style={{
          flex: 0,
          fontSize: 18,
          color: '#555',
          marginBottom: 5,
          textAlign: 'center'
        }}>
          There are no events in your itinerary.
        </Text>
        <Text style={{
          flex: 0,
          color: '#777',
          textAlign: 'center'
        }}>
          To add an event to your itinerary, click "Add to my itinerary" on the detail screen for the event.
        </Text>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },

  noItineraryItemsMessage: {
    flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center"
  }
})

module.exports = NoItineraryItemsScreen