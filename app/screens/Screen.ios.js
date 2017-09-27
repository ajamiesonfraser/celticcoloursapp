import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

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
              backButton={
                ((typeof this.props.canGoBack === 'function' && this.props.canGoBack()) || this.props.canGoBack)
                  ? <TouchableOpacity
                      style={styles.navBack}
                      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                      onPress={this.props.onBack}
                    >
                      <Icon name="angle-left" size={35} style={{marginTop:10}}/>
                    </TouchableOpacity>
                  : null
              }
            />
          : null}
        {this.props.children}        
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create ({
  navBack:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  },
  
})

module.exports = Screen