'use strict'
import React, { Component  } from 'react'
import { AppRegistry, TabBarIOS, StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'

import SideMenu from 'react-native-side-menu'
import Menu from './app/components/Menu'
import BottomBar from "./app/components/BottomBar"

// this is a test

class celticcoloursapp extends Component {

  state = {
    isOpen: false,
    selectedItem: 'About',
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, })
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  render() {

    const menu = 

    <Menu onItemSelected={this.onMenuItemSelected} />;
    
    console.log ('whatup')
    
    return (

      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>

          <BottomBar />

        <Button style={styles.button} onPress={() => this.toggle()}>
            <Image
              source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
        </Button>

      </SideMenu>

    )
  }

}

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e)
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

})

AppRegistry.registerComponent('celticcoloursapp', () => celticcoloursapp)