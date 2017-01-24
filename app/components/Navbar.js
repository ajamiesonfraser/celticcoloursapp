'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet, View, Image} from 'react-native'
import NavigationBar from 'react-native-navbar'
import AppNavigator from '../navigation/AppNavigator'
import ModalDropdown from 'react-native-modal-dropdown'

// class NavTitle extends Component {
//   render() {
//     return (
//       <Text>Hello {this.props.name}!</Text>
//     );
//   }
// }

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'My Schedule'
    }
  }

	render (){

		var rightButtonConfig = {
      title: 'Next',
      handler: function onNext() {
      }
    }


		return (
      <View>
			<NavigationBar
    		title={this.state.title}
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
