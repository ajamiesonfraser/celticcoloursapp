import React, { Component } from 'react'
import { StyleSheet, TabBarIOS, TabBarItemIOS, Image } from 'react-native'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import Client from '../services/Client'

class BottomBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "tab1"
    }
  }

  componentDidMount() {
    this.switchTabHandler = Client.events.addListener('switch tab', (tab) => {
      this.setState({
        selectedTab: tab
      })
    })
  }

  componentWillUnmount() {
    this.switchTabHandler.remove()
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
          onPress={() => Client.events.emit('switch tab', 'tab3')}>
            <AppNavigator
              initialRoute={{ident: "MapScreen"}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab1"}
          icon={require('../assets/home.png')}
          title={``}
          onPress={() => Client.events.emit('switch tab', 'tab1')}>
          <AppNavigator
            initialRoute={{ ident: "MyScheduleIndex"}} />

        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab2"}
          icon={require('../assets/fiddle.png')}
          title={``}
          onPress={() => Client.events.emit('switch tab', 'tab2')}>
            <AppNavigator
              initialRoute={{ident: "ArtistListing"}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "tab4"}
          icon={require('../assets/fiddle.png')}
          title={``}
          onPress={() => Client.events.emit('switch tab', 'tab4')}>
            <AppNavigator
              initialRoute={{ident: "ContactScreen"}} />
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
