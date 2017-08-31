import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Screen from './Screen'

class DetailScreen extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    urlData: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View style={{ paddingHorizontal: 25 }}>
            {this.props.children}
          </View>
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  navBack:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  }
})

module.exports = DetailScreen