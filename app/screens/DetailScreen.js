import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'

class DetailScreen extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    urlData: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <ViewContainer>
        <Navbar 
          navTitle={this.props.urlData.name}
          backButton={
            <TouchableOpacity
              style={styles.navBack}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              onPress={() => this.props.navigator.pop()}
            >
              <Icon name="angle-left" size={35} style={{marginTop:10}}/>
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <View style={{ paddingHorizontal: 25 }}>
            {this.props.children}
          </View>
          <View style={{ height: 80 }} />
        </ScrollView>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create ({
  navBack:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  }
})

module.exports = DetailScreen