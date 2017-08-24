import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'

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
        <StatusBarBackground/>   
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
  description:{
    margin:30,
    fontFamily: 'Helvetica',
    fontWeight:'100'
  },
  navBack:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  },
  homebase: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: '100'
  },
  detailData:{
    fontFamily: 'Helvetica',
    fontWeight:'100',
    fontSize:12,
    marginBottom: 10,
    width: 175
  },
  detailCategory:{
    fontSize:12,
    fontWeight: 'bold',
    color: '#C7C7CD',
    marginRight: 10,
    marginBottom:10
  },
  contentRow:{
    flexDirection: 'row'
  },
  contentDetail:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  showPicture:{
    backgroundColor: '#9B9B9B',
    height: 50,
    width:75,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 5
  },
  listingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70
  },
  listingItem: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    marginBottom: 5
  },
  listingName:{
    fontSize: 20,
    fontWeight: '100',
    fontFamily: 'Helvetica',
    marginBottom: 15
  },
  listingPicture:{
    backgroundColor: 'blue',
    height: 200,
    width:300,
    marginBottom: 15,
    borderRadius: 5
  },
  listingInfo:{
    flexDirection: "column",
    width:200,
    marginTop: 15
  },
})

module.exports = DetailScreen