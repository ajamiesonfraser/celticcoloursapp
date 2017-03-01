import React, { Component } from 'react'
import { StyleSheet, TabBarIOS, TabBarItemIOS, Image } from 'react-native'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

class BottomBar extends Component {

    constructor(props) {
    super(props)
    this.state = {
      selectedTab: "tab1",
      showName: [],
      artistName: []
      }
    }
    componentDidMount() {
      axios.all([
        axios.get('https://novastream.ca/xml2json.php?org=23324&type=shows&field=name,formatted_date,poster_url,formatted_start_time,venue_name,venue,seating,price,description_public,performances'),
        axios.get('https://novastream.ca/xml2json.php?org=23324&type=artists&field=name,web_photo_url,id,bio_public,homebase,shows')
      ])
      .then((response) => {
      // console.log(response)
      var sList = response[0].data
        for (var show in sList) {
        this.setState({
          showName : this.state.showName.concat([{
              listingName: sList[show].name, 
              id: sList[show].id, 
              startTime: sList[show].formatted_start_time, 
              listingPicture: sList[show].poster_url,
              listingDate: sList[show].formatted_date,
              listingVenue: sList[show].venue_name,
              listingCommunity:sList[show].venue[0].community,
              latitude: sList[show].venue[0].latitude,
              longitude: sList[show].venue[0].longitude,
              googleAddress: sList[show].venue[0].google_maps_link,
              listingPrice: sList[show].price,
              listingSeating: sList[show].seating,
              description: sList[show].description_public,
          }])
        })
      }
      var aList = response[1].data
        for (var artist in aList) {
          this.setState({
            artistName : this.state.artistName.concat([{
              listingName: aList[artist].name, 
              id: aList[artist].id, 
              profilePicture: aList[artist].web_photo_url,
              bio: aList[artist].bio_public,
              homebase: aList[artist].homebase,
              shows: aList[artist].shows[0].show[0].name
            }])
          })
        }
    })
    .done()
    }

  render(){
    return(

      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'red'}
        translucent={true}>


        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab3"}
          icon={require('../assets/compass.png')}
          title={``}
          onPress={() => this.setState({selectedTab: "tab3"})}>
            <AppNavigator
              initialRoute={{ident: "DiscoverMap"}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab1"}
          icon={require('../assets/home.png')}
          title={``}
          onPress={() => this.setState({selectedTab: "tab1"})}>
          <AppNavigator
            initialRoute={{
              ident: "MyScheduleIndex",
              passProps: {
                showName: this.state.showName
              }
            }} />

        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab2"}
          icon={require('../assets/fiddle.png')}
          title={``}
          onPress={() => this.setState({selectedTab: "tab2"})}>
            <AppNavigator
              initialRoute={{
                ident: "ArtistListing",
                passProps: {
                  artistName: this.state.artistName
                }
              }} />
        </Icon.TabBarItemIOS>

      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  icon:{
    height: 5,
    width: 5,
  }
})

module.exports = BottomBar
