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
          <Text style={styles.navTitle}>
            {this.props.navTitle}
          </Text>
        }
        leftButton= {this.props.backButton}
        rightButton= {this.props.rightButton}
        
      />
      </View>
		)

	}
}

const styles = StyleSheet.create({
   navTitle:{
    justifyContent:'center',
    alignItems:'center'
  },
  dropdown:{
    marginRight:20,
    width: 50,
    backgroundColor:"blue",
  }
})

module.exports = Navbar
