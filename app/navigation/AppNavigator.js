'use strict'
import React, { Component } from 'react'
import {Navigator, Text, StyleSheet} from 'react-native'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import ListingShowScreen from '../screens/ListingShowScreen'
import MapScreen from '../screens/MapScreen'
import ArtistListingScreen from '../screens/ArtistListingScreen'

class AppNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "MyScheduleIndex":
        return (
          <MyScheduleScreen
            {...globalNavigatorProps} />
        )

      case "ListingShow":
        return (
          <ListingShowScreen
            {...globalNavigatorProps}
            listing={route.listing} />
        )

      case "MapScreen":
        return (
          <MapScreen
            {...globalNavigatorProps} />
        )

      case "ArtistListing":
        return (
          <ArtistListingScreen
            {...globalNavigatorProps} />
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
