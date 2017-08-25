'use strict'

import React, { Component } from 'React'
import { Linking, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

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
      <TouchableOpacity
        onPress={this.handleClick}>
        <Image 
        	source={require('../assets/getDirections.png')}
        	style={styles.button} />
      </TouchableOpacity>
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
	    width: 126
  	},
  	text: {
    	color: 'white',
  	}
})

module.exports = GetDirectionsButton