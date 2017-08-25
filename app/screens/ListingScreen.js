'use strict'
import React, { Component} from 'react'
import {ActivityIndicator, AsyncStorage, Text, View, ListView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Button from 'react-native-button'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'

class ListingScreen extends Component {
  static propTypes = {
    listData: React.PropTypes.array.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    renderItemPicture: React.PropTypes.func,
    getItemRightText: React.PropTypes.func,
    onItemPress: React.PropTypes.func.isRequired,
  }

  _renderListingRow(listing, i) {
    return (
      <TouchableOpacity style={i % 2 != 0 ? styles.listingRow : StyleSheet.flatten([styles.listingRow, { backgroundColor: '#fafafa' }])} onPress={() => this.props.onItemPress(listing) } key={i}>
        {typeof this.props.renderItemPicture === 'function'
          ? <View style={styles.listingPictureWrapper}>
              {this.props.renderItemPicture(listing, styles.listingPicture)}
            </View>
          : null}
        {this.props.renderItem(listing, styles.listingInfo)}
        {typeof this.props.getItemRightText === 'function'
          ? <Text style={styles.startTime}>{this.props.getItemRightText(listing)}</Text>
          : null}
      </TouchableOpacity>
    )
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <View>
        <ListView
          pageSize={1}
          initialListSize={5}
          scrollRenderAheadDistance={1}
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.props.listData)}
          renderRow={(listing, sectionId, rowId) => {
            return this._renderListingRow(listing, rowId)
          }}  
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonIcon:{
    marginTop: 10,
    marginRight: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: 'red'
  },
  listingInfo:{
    flex: 1,
    flexDirection: "column"
  },
  startTime: {
    marginRight: 5,
    flexDirection: "column",
    color: "#F6655E",
    fontSize: 17
  },
   listingDate: {
    paddingBottom: 5,
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  listingVenue: {
    color: '#0076FF',
    paddingBottom: 5,
    fontSize: 11
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: 'center',
    paddingVertical: 10
  },
  listingPictureWrapper: {
    flex: 0,
    alignItems: 'center',
    marginHorizontal: 15
  },
  listingPicture:{
    backgroundColor: '#9B9B9B',
    height: 50,
    width: 50,
    marginBottom: 5,
    alignSelf: 'flex-start',
    borderRadius: 5
  },
  listingName: {
    flexDirection: 'column',
    fontSize: 17,
    paddingBottom: 5,
    fontWeight: '100',
    fontFamily: 'Helvetica'
  },

  listingMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25,
  },

  buttonContainerStyle: {
    flex: 0,
    justifyContent: 'center',
    marginHorizontal: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#3d97e8'
  },

  buttonStyle: {
    fontSize: 14,
    color: '#3d97e8'
  },

  buttonsRow: {
    justifyContent: 'flex-start',
    flexDirection: "row",
  }

});

module.exports = ListingScreen
