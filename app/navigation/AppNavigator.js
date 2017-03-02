'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet} from 'react-native'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import MapScreen from '../screens/MapScreen'
import ArtistListingScreen from '../screens/ArtistListingScreen'
import EventDetailScreen  from '../screens/EventDetailScreen'
import ArtistDetailScreen from '../screens/ArtistDetailScreen'
import DiscoverMap from '../screens/DiscoverMap'

class AppNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "MyScheduleIndex":
        return (
          <MyScheduleScreen
            {...globalNavigatorProps} />
        )

      case "MapScreen":
        return (
          <MapScreen
            {...globalNavigatorProps} />
        )


      case "DiscoverMap":
        return (
          <DiscoverMap
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

      case "ArtistDetail":
        return (
          <ArtistDetailScreen
            {...globalNavigatorProps}
            {...route.passProps} />
        )

      default:
        return (
          <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }

}

const styles = StyleSheet.create({

  navigatorStyles: {

  }

})

module.exports = AppNavigator
