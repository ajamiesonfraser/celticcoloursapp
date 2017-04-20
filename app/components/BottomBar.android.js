import React, { Component } from 'react'
import { StyleSheet, ToolbarAndroid, Image, View, DrawerLayoutAndroid, Text, TouchableOpacity } from 'react-native'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import MyToolbar from '../components/MyToolbar'
{/*import axios from 'axios'*/}

class BottomBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "MyScheduleIndex"
      }
    }

  render(){
    console.log('trying something')
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TouchableOpacity 
          onPress= {() => this._navigateToMap.bind(this), console.log('fuck me right?')}
        >
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress= {() => this._navigateToSchedule.bind(this), console.log('dear lord will this ever end?') }
        >
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress= {() => this._navigateToArtist.bind(this), console.log('this is hateful')}
        >
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Artists</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER'}>
        <MyToolbar 
          style={styles.toolbar}
          title={'Tryin It'}
          navigator={this.props.navigator}
          sidebarRef={()=>this._setDrawer()}/>
        <AppNavigator
            initialRoute={{
              ident: this.state.selectedTab,
        }} />
      </DrawerLayoutAndroid>
    ) 
  }
  _navigateToMap() {
    this.props.navigator.replace({
      ident:'MapScreen'
    })
  }
  _navigateToSchedule(){
    this.props.navigator.replace({
        ident:"MyScheduleIndex"})
  }
  _navigateToArtist(){
    this.props.navigator.replace({
        ident:"ArtistListing"})
  }

  _setDrawer() {
    this.refs['DRAWER'].openDrawer()
  }
  _closeDrawer() {
    this.refs['DRAWER'].closeDrawer()
  }
}

const styles = StyleSheet.create({
})

module.exports = BottomBar
