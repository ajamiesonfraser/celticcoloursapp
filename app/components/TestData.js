'use strict'

import React, { Component } from 'react'
import {StyleSheet, View, Text} from 'react-native'

class TestData extends Component {
	constructor() {
    super();
    this.state = {
      homebase: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.homebase}</Text>
      </View>
    );
  }
  // componentWillMount() {
  //   fetch('https://novastream.ca/xml2json.php?org=23324&type=artists')
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     this.setState({homebase: responseData.homebase})
  //     console.log(this.state.homebase)
  //   })
  //   .done();

  //   fetch('https://novastream.ca/xml2json.php?org=23324&type=artists')
  //   .then(function(response) {
  //     return response.json()
  //   })
  //   .then(function(json) {
  //     console.log('parsed json', json)
  //     this.setState({data:json})
  //   })
  //   .catch(function(ex) {
  //     console.log('parsing failed', ex)
  //   })
  //   .done()
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

module.exports = TestData