'use strict'

import React, {Component} from 'react'
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, Navigator, TabBarItemIOS } from 'react-native'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

var window = Dimensions.get('window');
var uri = 'https://pbs.twimg.com/profile_images/537787723164024832/lpI-9shb_400x400.jpeg';


class Menu extends Component {

  

  render() {
    return (
      
      <ScrollView scrollsToTop={false} style={styles.menu}>
        
        
        <Text
          onPress={() => this.props.onItemSelected('MapScreen')}
          style={styles.item}>
          Discover
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('')}
          style={styles.item}>
          Schedule
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('')}
          style={styles.item}>
          Artists
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('')}
          style={styles.item}>
          Contact
        </Text>


      
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    // backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 5,
  },
})

module.exports = Menu