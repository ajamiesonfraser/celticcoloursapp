'use strict'

import React, { Component } from 'React'
import { Linking, StyleSheet, View, TouchableOpacity, Image, Text, Dimensions } from 'react-native'
import Button from 'react-native-button'

var { width, height } = Dimensions.get('window');

class OpenURLButton extends React.Component {
  static propTypes = {
    url: React.PropTypes.string,
  };

  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  };

  render() {
    return (
			<TouchableOpacity style={styles.button} onPress={()=>{
				}}>
				<Text>Get Directions</Text>
			</TouchableOpacity>
			// <Button onPress={this.handleClick}>
			// 	Get Directions
			// </Button>
    );
  }
}


class GetDirectionsButton extends Component {

	render() {
	    return (
	    <View>
	        <OpenURLButton 
	        	url={this.props.mapUrl} />
	    </View>
	    );
	  }
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: 'white',
	    padding: 10,
	    paddingTop: 30,
  	},
  	button: {
	    padding: 10,
			width: width / 3,
			borderColor:"#0076FF",
			borderWidth:1
  	},
  	text: {
    	color: 'white',
  	}
})

module.exports = GetDirectionsButton