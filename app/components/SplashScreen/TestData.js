'use strict'

import React, { Component } from 'react'
import {StyleSheet, View, Text} from 'react-native'

class TestData extends Component {
	constructor(props) {
    super(props);
    this.state = {
      date: ''
    }
  }
  render() {
    return (
      <View>
        <Text>{this.state.date}</Text>
      </View>
    );
  }
  componentWillMount() {
    fetch('https://novastream.ca/xml2json.php?org=23324&type=artists')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({date: responseData.date})
       	// console.log('blah blah blah')
      })
      .done();
  }
}

const styles = StyleSheet.create({

})

module.exports = TestData