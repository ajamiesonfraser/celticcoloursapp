'use strict'

'use strict'
import React, { Component} from 'react'
import {Text, View, ListView, TouchableOpacity, StyleSheet } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'



class MapScreen extends Component {

  
  render () {
    console.log('whatever')
    
    return(
      
      <ViewContainer style={{backgroundColor:'white'}}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
      />
      </ViewContainer>
      )
  }
 }

 

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  personRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50
  },

  personName: {
    marginLeft: 25
  },

  personMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25
  },

  map: {
  	flex: 1
  }

});

module.exports = MapScreen