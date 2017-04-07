'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet} from 'react-native'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import MapScreen from '../screens/MapScreen'
import ArtistListingScreen from '../screens/ArtistListingScreen'
import EventDetailScreen  from '../screens/EventDetailScreen'
import EventDetailScreen2 from '../screens/EventDetailScreen2'
import MapEventDetailScreen from '../screens/MapEventDetailScreen'
import ArtistDetailScreen from '../screens/ArtistDetailScreen'
import ArtistDetailScreen2 from '../screens/ArtistDetailScreen2'



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

      case "EventDetail2":
        return (
          <EventDetailScreen2
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

      case "ArtistDetail2":
        return (
          <ArtistDetailScreen2
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
