'use strict'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class StatusBarBackground extends Component {

	render() {
		return(
			
			<View style={[styles.StatusBarBackground, this.props.style || {}]}>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	StatusBarBackground: {
		height:20,
		backgroundColor: "white"
	},
})

module.exports = StatusBarBackground