'use strict';

import React, { Component } from 'react';
import {
StyleSheet,
View,
Text
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');

class MyToolbar extends Component {
  render() {
    var navigator = this.props.navigator;
    return (
      <ToolbarAndroid
        title={this.props.title}
        navIcon={require('../assets/ic-menu-white.png')}
        style = {styles.toolbar}
        titleColor={'white'} 
        onIconClicked={this.props.sidebarRef}
      />
    );
  }
}
const styles = StyleSheet.create({
//define your own style  
	toolbar:{
    	height:35,
    	backgroundColor:'white'
  	}
});

module.exports = MyToolbar;