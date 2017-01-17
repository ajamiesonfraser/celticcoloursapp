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
              initialRoute={{ident: "PeopleIndex"}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab2"}
          iconName="snowflake-o"
          onPress={() => this.setState({selectedTab: "tab2"})}>
            <AppNavigator
              initialRoute={{ident: "PersonShow",
                            person: {firstName: "aj", lastName: "fraser", id: 1}}} />
        </Icon.TabBarItemIOS>

      </TabBarIOS>
    )
  }
}

module.exports = BottomBar