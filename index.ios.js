'use strict'
import React, { Component  } from 'react'
import { AppRegistry, TabBarIOS, StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import SideMenu from 'react-native-side-menu'
import Menu from './app/components/Menu'
import BottomBar from "./app/components/BottomBar"
import Navbar from './app/components/Navbar'
import Button from './app/components/Button'


class celticcoloursapp extends Component {

  render() {
    return (
      <BottomBar />
    )
  }

}

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('celticcoloursapp', () => celticcoloursapp)
