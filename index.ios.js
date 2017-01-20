'use strict'
import React, { Component  } from 'react'
import { AppRegistry, TabBarIOS, StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import SideMenu from 'react-native-side-menu'
import Menu from './app/components/Menu'
import BottomBar from "./app/components/BottomBar"
import Navbar from './app/components/Navbar'
import Button from './app/components/Button'


class celticcoloursapp extends Component {

//this makes the SideMenu drawer operate

  state = {
    isOpen: false,
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

    var menu = <Menu onItemSelected={this.onMenuItemSelected} />

    return (

      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>


          <BottomBar />

        <Button style={styles.button} onPress={() => this.toggle()}>
            <Image
              source={require('./assets/menu.png')} style={{width: 25, height: 25}} />
        </Button>

      </SideMenu>
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
