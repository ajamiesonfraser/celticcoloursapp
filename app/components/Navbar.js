'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet} from 'react-native'
import NavigationBar from 'react-native-navbar'
import AppNavigator from '../navigation/AppNavigator'

class Navbar extends Component {

	render (){

		var rightButtonConfig = {
      		title: 'Next',
      		handler: function onNext() {
      		}
    	}

    	var titleConfig = {
      		title: 'My Schedule',
    	}

		return (

			<NavigationBar
          		title={titleConfig}
          		rightButton={rightButtonConfig}

           	/>


		)

	}
}

module.exports = Navbar
