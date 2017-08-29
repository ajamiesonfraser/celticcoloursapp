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
    listData: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired,
    renderItem: React.PropTypes.func.isRequired,
    renderItemPicture: React.PropTypes.func,
    getItemRightText: React.PropTypes.func,
    getSectionHeaderText: React.PropTypes.func,
    onItemPress: React.PropTypes.func.isRequired,
    sections: React.PropTypes.bool
  }

  _renderSectionHeader = (sectionData, category) => {
    if (this.props.sections) {
      return (
        <View style={{
          backgroundColor: '#fff',
          paddingVertical: 10,
          paddingHorizontal: 10,
          shadowColor: '#aaa',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 8,
          shadowOpacity: 0.2
        }}>
          <Text style={{
            color: '#333',
            fontSize: 16
          }}>
            {this.props.getSectionHeaderText(sectionData)}
          </Text>
        </View>
      )
    }
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
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2
      },
      sectionHeaderHasChanged: (s1, s2) => {
        return s1 !== s2
      },
      /*getRowData: (blob, sId, rId) => {
        console.log('getRowData ', blob)
      },
      getSectionHeaderData: (blob, sId) => {
        console.log('getSectionHeaderData ', blob)
      }*/
    })

    if (this.props.sections) {
      /*const blob = { rows: {}, sections: {} }
      blob.sectionIds = Object.keys(this.props.listData)

      blob.rowIdsBySection = blob.sectionIds.map((sectionId, index) => {
        return this.props.listData[sectionId]
      })

      console.log('blob = ', blob)

      ds = ds.cloneWithRowsAndSections(blob, blob.sectionIds, blob.rowIdsBySection)*/
      ds = ds.cloneWithRowsAndSections(this.props.listData)
    } else {
      ds = ds.cloneWithRows(this.props.listData)
    }
    
    return (
      <View style={{ flex: 1 }}>
        <ListView
          pageSize={1}
          automaticallyAdjustContentInsets={false}
          scrollRenderAheadDistance={1}
          enableEmptySections={true}
          dataSource={ds}
          renderRow={(listing, sectionId, rowId) => {
            return this._renderListingRow(listing, rowId)
          }}
          renderSectionHeader={this.props.sections
            ? this._renderSectionHeader
            : null}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});

module.exports = ListingScreen
