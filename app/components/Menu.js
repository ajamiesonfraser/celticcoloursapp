'use strict'

import React, {Component} from 'react'
import { Dimensions, StyleSheet, ScrollView, View, Image, Text } from 'react-native'

var window = Dimensions.get('window');
var uri = 'https://pbs.twimg.com/profile_images/537787723164024832/lpI-9shb_400x400.jpeg';

const people = [
  {firstName: "aj", lastName: "fraser", id: 1},
  {firstName: "darcy", lastName: "campbell", id: 2},
  {firstName: "adam", lastName: "walsh", id: 3},
  {firstName: "matt", lastName: "lewis", id: 4},
  {firstName: "scott", lastName: "moore", id: 5}
]

class Menu extends Component {
  
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      
      <ScrollView scrollsToTop={false} style={styles.menu}>
        
        <View style={styles.avatarContainer}>
          
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>A.J.</Text>
        
        </View>

        <Text
          onPress={() => this.props.onItemSelected('About')}
          style={styles.item}>
          About
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          Contacts
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
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
})

module.exports = Menu