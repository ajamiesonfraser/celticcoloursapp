import React, { Component } from 'react'
import { StyleSheet, TabBarIOS, TabBarItemIOS } from 'react-native'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

class BottomBar extends Component {

    constructor(props) {
    super(props)
    this.state = {
      selectedTab: "tab1"
      }
    }

  render(){
    return(

      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'red'}
        translucent={true}>


        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab3"}
          iconName="compass"
          title={``}
          onPress={() => this.setState({selectedTab: "tab3"})}>
            <AppNavigator
              initialRoute={{ident: "MapScreen"}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab1"}
          iconName="home"
          title={``}
          onPress={() => this.setState({selectedTab: "tab1"})}>

          <AppNavigator
            initialRoute={{ident: "MyScheduleIndex"}} />

        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab2"}
          iconName="music"
          title={``}
          onPress={() => this.setState({selectedTab: "tab2"})}>
            <AppNavigator
              initialRoute={{ident: "ListingShow",
                            listing: {listingName: "Ceilidh Experience", id: 1}}} />
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
