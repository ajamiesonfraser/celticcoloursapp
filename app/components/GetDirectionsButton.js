'use strict'

import React, { Component } from 'React'
import { Linking, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

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
        <View style={styles.button}>
          <Text style={styles.text}>Get Directions</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


class GetDirectionsButton extends Component {

	render() {
	    return (
	    <View>
	        <OpenURLButton url={'http://maps.apple.com/?ll=37.484847,-122.148386'} />
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
	    backgroundColor: '#3B5998',
	    marginBottom: 10,
  	},
  	text: {
    	color: 'white',
  	}
})

module.exports = GetDirectionsButton