import React, { Component } from 'react'
import { StyleSheet, ToolbarAndroid, Image, View, DrawerLayoutAndroid, Text, TouchableOpacity } from 'react-native'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import MyToolbar from '../components/MyToolbar'
import Client from '../services/Client'
{/*import axios from 'axios'*/}

const ROUTES = [
  { title: 'Discover Nearby', ident: 'MapScreen' },
  { title: 'My Itinerary', ident: 'MyItineraryScreen' },
  { title: 'Upcoming Events', ident: 'EventListing' },
  { title: 'Artists', ident: 'ArtistListing' },
  { title: 'Contact', ident: 'ContactScreen' },
]

class BottomBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'EventListing'
    }
  }

  componentDidMount() {
    this.openDrawerListener = Client.events.addListener('open drawer', () => {
      // console.log('this = ', this)
      this._setDrawer()
    })
  }

  componentWillUnmount() {
    this.openDrawerListener.remove()
  }

  render() {
    // console.log('trying something')
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{alignItems:'center'}}>
          <Image style={{width:50, height:50}} source={require('../assets/celtic-colours-2017-logo.png')}/>
        </View>
        {ROUTES.map((el, i) => {
          return (
            <TouchableOpacity 
              onPress={() => {
                this._closeDrawer()
                this.refs.NAV.refs.appNavigator.resetTo({
                  ident: el.ident,
                  title: el.title
                })
              }}
              key={i}
            >
              <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>
                {el.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER'}>
        <AppNavigator
          ref={'NAV'}
          initialRoute={{
            ident: this.state.selectedTab,
            title: 'Celtic Colours App'
          }}
        />
      </DrawerLayoutAndroid>
    ) 
  }

  _setDrawer = () => {
    this.refs['DRAWER'].openDrawer()
  }

  _closeDrawer = () => {
    this.refs['DRAWER'].closeDrawer()
  }
}

const styles = StyleSheet.create({
})

module.exports = BottomBar
