import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

import Client from '../services/Client'

var NavigationBarRouteMapper = { 
  LeftButton: function( route, navigator, index, navState ){
    if (navigator.getCurrentRoutes().length > 1) {
      return (
        <TouchableOpacity
          style={styles.navBack}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => {
            navigator.pop();
          }}
        >
          <Icon name="angle-left" size={24} style={{marginLeft:10}}/>
        </TouchableOpacity>
      )
    }
  },
  Title: function( route, navigator, index, navState ){
    return (
      <View style={styles.navTitle}>
        <Text style={{ color: '#555', fontWeight: '200', fontSize: 18 }}>{ route.title }</Text>
      </View>
    )
  },
  RightButton: function( route, navigator, index, navState ){
  }
}

const styles = StyleSheet.create({
  navBack: {
  },
  navTitle:{
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
    fontSize: 12,
    color: '#fff'
  }
})

styles.navbarButtonContainer = [styles.buttonPrimaryContainerStyle, {
  marginVertical: 8
}]

module.exports = NavigationBarRouteMapper