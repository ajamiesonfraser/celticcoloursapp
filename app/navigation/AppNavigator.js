'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet, View} from 'react-native'
//import { Navigator } from 'react-native-deprecated-custom-components'
import EventListingScreen from '../screens/EventListingScreen'
import MyItineraryScreen from '../screens/MyItineraryScreen'
import MapScreen from '../screens/MapScreen'
import ArtistListingScreen from '../screens/ArtistListingScreen'
import EventDetailScreen  from '../screens/EventDetailScreen'
import MapEventDetailScreen from '../screens/MapEventDetailScreen'
import ArtistDetailScreen from '../screens/ArtistDetailScreen'
import ContactScreen from '../screens/ContactScreen'
import Screen from '../screens/Screen'
import ViewContainer from '../components/ViewContainer'
import NavigationBarRouteMapper from './NavigationBarRouteMapper'
import Client from '../services/Client'

class AppNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navTitle: 'Celtic Colours App'
    }
  }

  componentDidMount() {
    this.navTitleHandler = Client.events.addListener('set nav title', (navTitle) => {
      this.setState({ navTitle });
    })
  }

  componentWillUnmount() {
    this.navTitleHandler.remove()
  }

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    // console.log('globalNavigatorProps = ', globalNavigatorProps)

    // console.log('this.refs = ', this.refs)

    switch(route.ident) {
      case 'MyItineraryScreen':
        return (
          <MyItineraryScreen
            {...globalNavigatorProps} />
        )
        
      case 'EventListing':
        return (
          <EventListingScreen
            {...globalNavigatorProps} />
        )

      case "MapScreen":
        return (
          <MapScreen
            {...globalNavigatorProps} />
        )

      case "ArtistListing":
        return (
          <ArtistListingScreen
            {...globalNavigatorProps}/>
        )

      case "EventDetail":
        return (
          <EventDetailScreen
            {...globalNavigatorProps}
            {...route.passProps} />
        )

      case "MapEventDetail":
        return (
          <MapEventDetailScreen
            {...globalNavigatorProps}
            {...route.passProps} />
        )

      case "ArtistDetail":
        return (
          <ArtistDetailScreen
            {...globalNavigatorProps}
            {...route.passProps} />
        )
      
        case "ContactScreen":
          return (
            <ContactScreen
              {...globalNavigatorProps}
              {...route.passProps}/>
          )

      default:
        return (
          <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
        )
    }
  }

  render() {
    let navTitle = 'Celtic Colours App'

    // console.log('refs: ', this.refs)

    if (this.refs.appNavigator != null) {
      const currentRoutes = this.refs.appNavigator.getCurrentRoutes()
      if (currentRoutes.length != 0) {
        navTitle = currentRoutes[currentRoutes.length - 1].title || navTitle
      }
    }

    return (

      <Screen
        navbar={false}
        navTitle={navTitle}
        canGoBack={() => this.refs.appNavigator.getCurrentRoutes().length > 1}
        onBack={() => this.refs.appNavigator.pop()}
      >
        <Navigator
          initialRoute={this.props.initialRoute}
          ref="appNavigator"
          style={styles.navigatorStyles}
          renderScene={(...args) => {
            return (
              <ViewContainer style={{ paddingTop: 44 }}>
                {this._renderScene(...args)}
              </ViewContainer>
            )
          }}
          configureScene={(route) => {
            return {
              ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
            }
          }}
          navigationBar={
            <Navigator.NavigationBar 
              routeMapper={ NavigationBarRouteMapper }
              style={{
                height: 44,
                backgroundColor: '#fff'
              }}
            />
          }
        />
      </Screen>
    )
  }

}

const styles = StyleSheet.create({

  navigatorStyles: {
    flex: 1
  }

})

module.exports = AppNavigator
