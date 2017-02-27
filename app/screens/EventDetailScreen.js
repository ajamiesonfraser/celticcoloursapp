'use strict'

import React, { Component } from 'React'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ListView } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Navbar from '../components/Navbar'
import StatusBarBackground from '../components/StatusBarBackground'
import GetDirectionsButton from '../components/GetDirectionsButton'

class EventDetailScreen extends Component {


	render(){
    console.log(this.props.performer)
    return(
			<ViewContainer>
        <Navbar 
        	navTitle = {this.props.listingName}
        	backButton = {
          	<TouchableOpacity style={styles.navBack} onPress={() => this.props.navigator.pop() }>
          		<Icon name="angle-left" size={25} style={{marginTop:10}}/>
          	</TouchableOpacity>
        	}
        />
        <StatusBarBackground/>   
        <ScrollView>
        <View style={styles.contentDetail}>
            {/*<Image style={styles.listingPicture} source={{uri: this.props.listingPicture}}/>*/}
            <Text style={styles.listingName}>{this.props.listingName}</Text>
            <View style={styles.contentRow}>
              <View>
                <Text style={styles.detailCategory}>DATE</Text>
                <Text style={styles.detailCategory}>VENUE</Text>
                <Text style={styles.detailCategory}>COMMUNITY</Text>
                <Text style={styles.detailCategory}>TICKETS</Text>
              </View>
              <View style={{marginBottom:15}}>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.listingDate} {this.props.startTime}</Text>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'} >{this.props.listingVenue}</Text>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.listingCommunity}</Text>
                <Text style={styles.detailData} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.listingPrice} {this.props.listingSeating}</Text>
              </View>
            </View>
            <GetDirectionsButton
              mapUrl={`http://maps.apple.com/?daddr=${this.props.latitude},${this.props.longitude}`}/>
            <Text style={styles.description}>{this.props.description}</Text>

          </View>
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
  listingName:{
    fontSize: 28,
    paddingBottom: 20,
    fontWeight: '100',
    fontFamily: 'Helvetica'
  },
  listingPicture:{
    backgroundColor: 'blue',
    height: 200,
    width:300,
    marginBottom: 15
  },
})

module.exports = EventDetailScreen