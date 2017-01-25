'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import NavigationBar from 'react-native-navbar'
import AppNavigator from '../navigation/AppNavigator'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'

class Navbar extends Component {

	render (){

		return (
      <View>
			<NavigationBar
        title = {
          <Text>
            {this.props.navTitle}
          </Text>
        }
        leftButton= {this.props.backButton}
        rightButton={
          <ModalDropdown 
            options={['My Events', 'By Day', 'By Artist', 'By Region', 'By Type']}>
            <Image 
              style={styles.buttonIcon}
              source={require('../assets/downArrow.png')} />
          </ModalDropdown>
        }
      />
      </View>
		)

	}
}

const styles = StyleSheet.create({
  dropdown:{
    marginRight:20,
    width: 50,
    backgroundColor:"blue",
  },
  buttonIcon:{
    marginTop: 5,
    marginRight: 20,
    height: 30,
    width: 30
  }
})

module.exports = Navbar
