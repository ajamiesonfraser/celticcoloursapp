import React, { Component } from 'react'
import {
  Navigator,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
//import { Navigator } from 'react-native-deprecated-custom-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import AndroidBackButton from 'react-native-android-back-button'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'

class Screen extends Component {
  static propTypes = {
    navTitle: React.PropTypes.string.isRequired,
    canGoBack: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.func
    ]).isRequired,
    onBack: React.PropTypes.func.isRequired,
    navbar: React.PropTypes.bool
  }

  static defaultProps = {
    navbar: false
  }
  

  render() {
    return (
      <ViewContainer>
        {this.props.navbar
          ? <Navbar 
              navTitle={this.props.navTitle}
            />
          : null}
        <AndroidBackButton
          onPress={() => {
            if (((typeof this.props.canGoBack === 'function' && this.props.canGoBack()) || this.props.canGoBack)) {
              this.props.onBack()
              return true
            }
            return false
          }}
        />
        {this.props.children}        
      </ViewContainer>
    )
  }
}
module.exports = Screen