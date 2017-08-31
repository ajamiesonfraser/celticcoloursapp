'use strict'
import React, { Component } from 'react'
import {Navigator, Platform, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import NavigationBar from 'react-native-navbar'
import AppNavigator from '../navigation/AppNavigator'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import Client from '../services/Client'

class Navbar extends Component {

	render (){
		return (
      <View>
        <NavigationBar
          title={{
            title: this.props.navTitle,
            style: {
              fontSize: 16,
              fontWeight: '300'
            }
          }}
          leftButton={Platform.OS == 'android'
            ? <TouchableOpacity
                style={styles.navBack}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                onPress={() => Client.events.emit('open drawer')}
              >
                <Icon name="bars" size={24} style={{marginTop:10, marginLeft: 10}}/>
              </TouchableOpacity>
            : this.props.backButton}
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
