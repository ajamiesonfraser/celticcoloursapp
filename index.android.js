'use strict'
import React, { Component  } from 'react'
import { AppRegistry, StyleSheet } from 'react-native'
import BottomBar from "./app/components/BottomBar"


console.disableYellowBox = true;

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

