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
        selectedTab={this.state.selectedTab}>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab1"}
          title={`TAB 1`}
          iconName="snowflake-o"
          onPress={() => this.setState({selectedTab: "tab1"})}>

          <AppNavigator
            initialRoute={{ident: "MyScheduleIndex"}} />

        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab2"}
          iconName="snowflake-o"
          onPress={() => this.setState({selectedTab: "tab2"})}>
            <AppNavigator
              initialRoute={{ident: "ListingShow",
                            listing: {listingName: "Ceilidh Experience", id: 1}}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab3"}
          title={'TAB 3'}
          iconName="snowflake-o"
          onPress={() => this.setState({selectedTab: "tab3"})}>
            <AppNavigator
              initialRoute={{ident: "MapScreen"}} />
        </Icon.TabBarItemIOS>


      </TabBarIOS>
    )
  }
}

module.exports = BottomBar
