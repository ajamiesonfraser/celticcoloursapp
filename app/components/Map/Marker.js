import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

import MapView from 'react-native-maps';
const offset_map_small = 0.0001;
import ImageCluster from '../../assets/marker.png'
import ImageMarker1 from '../../assets/pin1.png'
import ImageMarker2 from '../../assets/pin2.png'
export default class Marker extends React.Component {

  state = {
   calloutActive:false
  }

  onPress() {
    if (!this.props.feature.properties.featureclass) {
      //  Calculer l'angle
      const { region } = this.props;
      const category = this.props.feature.properties.featureclass || "Cluster";
      const angle = region.longitudeDelta || 0.0421/1.2;
      const result =  Math.round(Math.log(360 / angle) / Math.LN2);
      //  Chercher les enfants
      const markers = this.props.clusters["places"].getChildren(this.props.feature.properties.cluster_id, result);
      const newRegion = [];
      const smallZoom = 0.05;
      //  Remap
      markers.map(function (element) {
        newRegion.push({
          latitude: offset_map_small + element.geometry.coordinates[1] - region.latitudeDelta * smallZoom,
          longitude: offset_map_small + element.geometry.coordinates[0] - region.longitudeDelta * smallZoom,
        });

        newRegion.push({
          latitude: offset_map_small + element.geometry.coordinates[1],
          longitude: offset_map_small + element.geometry.coordinates[0],
        });

        newRegion.push({
          latitude: offset_map_small + element.geometry.coordinates[1] + region.latitudeDelta * smallZoom,
          longitude: offset_map_small + element.geometry.coordinates[0] + region.longitudeDelta * smallZoom,
        });
      });
      //  Préparer the retour
      const options = {
        isCluster: true,
        region: newRegion,
      };
      //  Ensuite envoyer l'événement
      if (this.props.onPress) {
        this.props.onPress({
          type: category,
          feature: this.props.feature,
          options: options,
        });
      }
    }
  }
  
  drawCallOut(){
    if(this.props.markerActivity == true){
      return (
        <View style={styles.callout}>
          <TouchableHighlight onPress={()=>{
            {/* this.props.onCallOutPress(this.props.markerIdx) */}
            }}>
            <View style={styles.calloutView1}>
                  <Image style={styles.calloutPhoto} source={{uri: this.props.feature.data.markerData.poster_url}}/>
                </View>
            <View style={styles.calloutView2}>
              <Text style={styles.calloutTitle}>{this.props.feature.data.markerData.name}</Text>
              <Text style={styles.calloutVenue}>{this.props.feature.data.markerData.venue_name}</Text>
              <Text style={styles.calloutCommunity}>{this.props.feature.data.markerData.venue[0].community}</Text>
              <Text style={styles.calloutDate}>{this.props.feature.data.markerData.formatted_date}</Text>
              <Text style={styles.calloutTime}>{this.props.feature.data.markerData.formatted_start_time} - {this.props.feature.data.markerData.formatted_end_time}</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    }    

    return null
  }
  
  render() {
    const latitude = this.props.feature.geometry.coordinates[1];
    const longitude = this.props.feature.geometry.coordinates[0];
    const category = this.props.feature.properties.featureclass || "Cluster";
    const text = (category  == "Cluster" ? this.props.feature.properties.point_count : "");
    const markerImage = (this.props.feature.data && this.props.feature.data.type == "shows") ? ImageMarker1 : ImageMarker2
    return (
      <MapView.Marker
        coordinate={{
          latitude,
          longitude,
        }}
        flat={true}
        onPress={()=>{
          {/* console.log("marker press");
          this.setState({calloutActive: true}) */}
          {/* this.props.onMarkerPress(this.props.markerIdx); */}
        }}
      >
      {
        category == "Cluster" ? 
          <Image style={{ tintColor: "red" }} source={ImageCluster} />
        :
          <Image style={{ width:40, height:40 }} source={markerImage} />
      }
      {
        category == "Cluster" ?
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{text}</Text>
          </View>
        :
          this.drawCallOut()
          
      }  
      </MapView.Marker>
    );
  }
}


var styles = StyleSheet.create({
  callout:{
    position:'absolute',
    top:-230,
    left:-95,
    padding: 15,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 230,
    width: 210,
    backgroundColor:'white',
    borderColor:'#000',
    borderWidth:0.5,
    borderRadius:10,
  },
  calloutView1: {
    alignItems: 'center',
    marginBottom: 10
  },
  calloutView2: {
    alignItems: 'center'
  },
  calloutPhoto:{
    width: 150,
    height: 75,
    borderRadius: 5
  },
  calloutTitle:{
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  calloutVenue:{
    fontSize:13,
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 3,
    color: '#0076FF'
  },
  calloutDate:{
    marginTop:5,
    fontWeight: 'bold',
    fontSize: 11
  },
  calloutTime:{
    color:'#e95644',
    fontSize: 13
  },
  calloutCommunity:{
    fontSize:11
  },
  textContainer:{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    fontSize: 10,
    color: "white",
    textAlign: "center",
  }
});
