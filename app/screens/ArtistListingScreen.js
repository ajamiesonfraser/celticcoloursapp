'use strict'
import React, { Component} from 'react'
import {Text, View, ListView,StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Image from 'react-native-image-progress'
import LoadingView from 'react-native-loading-view'
import ProgressBar from 'react-native-progress/Circle'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'
import ListingScreen from './ListingScreen'
import Client from '../services/Client'

const FilterTypes = {
  ALPHABET: 'alphabet',
  LOCATION: 'location'
}

var { width, height } = Dimensions.get('window');

class ArtistListingScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      listData:[],
      typeFilter: FilterTypes.ALPHABET,
    }
    
  }

  componentDidMount() {

    const listData = Object.keys(Client.data.artists).map((key) => {
      return {urlData: Client.getArtistById(key)};
    })
    
    listData.sort((a, b)=>{
      var nameA = a.urlData.name.toUpperCase();
      var nameB = b.urlData.name.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    this.setState({ listData })

    
  }

  _applyFilters(){
    const listData = this.state.listData;
    
    if(this.state.typeFilter == FilterTypes.ALPHABET){
      listData.sort((a, b)=>{
        var nameA = a.urlData.name.toUpperCase();
        var nameB = b.urlData.name.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
    }else{
      listData.sort((a, b)=>{
        var nameA = a.urlData.homebase.toUpperCase();
        var nameB = b.urlData.homebase.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
    }
    this.setState({ listData })
  }

  renderFilterBar() {
    return (
      <View style={{height: 40}}>
        <View style={{flex: 1, flexDirection: 'row'}}>          
          <View style={{width: width / 2, alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{
                this.setState({
                  typeFilter:FilterTypes.ALPHABET
                }, ()=>{
                  this._applyFilters();
                })
              }}>
              {
                this.state.typeFilter == FilterTypes.LOCATION ?
                  <Text style={{opacity:0.6}}>By Alphabet</Text>
                : 
                  <Text>By Alphabet</Text>
              }              
            </TouchableOpacity>
          </View>
          <View style={{width: width / 2, alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{
                this.setState({
                  typeFilter:FilterTypes.LOCATION
                }, ()=>{
                  this._applyFilters();
                })
              }}>
              {
                this.state.typeFilter == FilterTypes.ALPHABET ?
                  <Text style={{opacity:0.6}}>By Location</Text>
                : 
                  <Text>By Location</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ViewContainer style={{backgroundColor:'white'}}>
        {this.renderFilterBar()}
        {
          this.state.listData.length == 0 ?
            <LoadingView loading={true}>
            </LoadingView>
          :
            <ListingScreen
              listData={this.state.listData}
              renderItemPicture={(listing, style) => {
                return (
                  <Image indicator={ProgressBar} style={style} source={{uri: listing.urlData.web_photo_url}}/>
                )
              }}
              renderItem={(listing, style) => {
                return (
                  <View style={style}>
                    <Text style={styles.listingName} numberOfLines={1} ellipsizeMode={'tail'}>{listing.urlData.name}</Text>
                    <Text style={styles.homebase}>{listing.urlData.homebase}</Text>
                  </View>
                )
              }}
              onItemPress={(listing) => {
                this._navigateToArtistDetail(listing)
              }}
            />
        }
        
      </ViewContainer>
    )
  }

  _navigateToArtistDetail(listing) {
    this.props.navigator.push({
      ident: "ArtistDetail",
      passProps: {
        urlData:listing.urlData
      }
    })
  }

}

const styles = StyleSheet.create({
  homebase: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  listingName: {
    flexDirection: 'column',
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
    fontFamily: 'Helvetica'
  }
});

module.exports = ArtistListingScreen
