import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button
} from 'react-native';

import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Circle'
import MapView from 'react-native-maps'
import supercluster from 'supercluster'
import isEqual from 'lodash.isequal'

import Marker from './Marker';

import ImageCluster from '../../assets/marker.png'
import ImageMarker1 from '../../assets/pin1.png'
import ImageMarker2 from '../../assets/pin2.png'

const initRegion = {
  latitude: 46.139907,
  longitude: -60.195829,
  latitudeDelta: 0.0922/1.2,
  longitudeDelta: 0.0421/1.2,
}

var styles = StyleSheet.create({
  callout:{
    position:'absolute',
    top:-230,
    left:-85,
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
    zIndex:50
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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex:1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex:0
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
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


export default class Map extends React.Component {
 

  constructor(props) {
    super(props)
    this.state = {
      mapLock: false,
      region: initRegion,
      mapPoints:[],
      curMapPoints:[],
    }
  }


  setRegion(region) {
    if(Array.isArray(region)) {
      region.map(function(element) { 
        if (element.hasOwnProperty("latitudeDelta") && element.hasOwnProperty("longitudeDelta")) {
          region = element;
          return;
        }
      })
    }
    if (!Array.isArray(region)) {
      this.setState({
        region: region
      });
    } else {
      console.log("We can't set the region as an array");
    }
  }


  componentDidMount() {
    // this.componentWillReceiveProps(this.props);
  }

  createMarkersForLocations(mapPoints) {
    return {
      places: mapPoints
    };
  }


  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.state.mapPoints, nextProps.mapPoints)){
      console.log("received")
      this.setState({
        mapPoints: nextProps.mapPoints,
        curMapPoints: nextProps.mapPoints
      }, ()=>{this.createClusters()})
    }
  }

  createClusters(){
    const markers = this.createMarkersForLocations(this.state.curMapPoints);
    if (markers && Object.keys(markers)) {
      const clusters = {};
      this.setState({
        mapLock: true
      });
      Object.keys(markers).forEach(categoryKey => {
        // Recalculate cluster trees
        const cluster = supercluster({
          radius: 60,
          maxZoom: 16,
        });

        cluster.load(markers[categoryKey]);

        clusters[categoryKey] = cluster;
      });

      this.setState({
        clusters,
        mapLock: false
      });
    }
  }


  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }


  createMarkersForRegion_Places() {
    const padding = 0.25;
    if (this.state.clusters && this.state.clusters["places"]) {
      let markers = this.state.clusters["places"].getClusters([
        this.state.region.longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
        this.state.region.longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());   
      return markers;
    }
    return [];
  }

  onMarkerPress(idx){
    let pointList = this.state.curMapPoints;
    for(var i = 0 ; i < pointList.length ; i++){
      pointList[i].markerActivity = false;
    }
    pointList[idx].markerActivity = true;
    this.setState({
      curMapPoints: pointList
    }, ()=>{this.createClusters()})
  }

  onCallOutPress(idx){
    
    // this.initialMapPoints();
    console.log("call out press");
   
  }

  onChangeRegionComplete(region) {
    this.setRegion(region);
    this.setState({
      moving: false,
    });
  }

  onChangeRegion(region) {
    this.setState({
      moving: true,
    });
  }

  drawCallOut(element){
    if(element.markerActivity == true){
      return (
          <View style={styles.callout}>         
            <TouchableOpacity onPress={()=>{
              console.log("call out click")
            }}>   
              <View style={styles.calloutView1}>
                    <Image style={styles.calloutPhoto} source={{uri: element.data.markerData.poster_url}}/>
                  </View>
              <View style={styles.calloutView2}>
                <Text style={styles.calloutTitle}>{element.data.markerData.name}</Text>
                <Text style={styles.calloutVenue}>{element.data.markerData.venue_name}</Text>
                <Text style={styles.calloutCommunity}>{element.data.markerData.venue[0].community}</Text>
                <Text style={styles.calloutDate}>{element.data.markerData.formatted_date}</Text>
                <Text style={styles.calloutTime}>{element.data.markerData.formatted_start_time} - {element.data.markerData.formatted_end_time}</Text>
              </View>
            </TouchableOpacity>
          </View>
      )
    }    

    return null
  }

  renderMarkers(){
    let markers = this.createMarkersForRegion_Places();
    const { clusters, region } = this.state;
    let markerArray = markers.map((element, i) => {
      const category = element.properties.featureclass || "Cluster";
      const text = (category  == "Cluster" ? element.properties.point_count : "");
      const markerImage = (element.data && element.data.type == "shows") ? ImageMarker1 : ImageMarker2
      return(
        <MapView.Marker
          key={i}
          coordinate={{
            latitude: element.geometry.coordinates[1],
            longitude: element.geometry.coordinates[0]
          }}
          flat={true}
          onPress={ ()=>{ 
            if(category != 'Cluster'){
              console.log("marker click")
              this.onMarkerPress(element.idx)
            }else{
              let pointList = this.state.curMapPoints;
              for(var i = 0 ; i < pointList.length ; i++){
                pointList[i].markerActivity = false;
              }
              this.setState({
                curMapPoints: pointList
              }, ()=>{this.createClusters()})
            }
               
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
              this.drawCallOut(element)
              
          }  
        </MapView.Marker>
      )
    });
    return markerArray;
  }

  render() {
    return (
      <MapView
          ref={ref => { this.map = ref; }} 
          initialRegion={this.props.region}
          onRegionChange={this.onChangeRegion.bind(this)}
          onRegionChangeComplete={this.onChangeRegionComplete.bind(this)}
          showsUserLocation={true}
          style={styles.map}          
          onPress={(e)=>{
            if(!e.nativeEvent.action || (e.nativeEvent.action && e.nativeEvent.action != "marker-press")){
              let pointList = this.state.curMapPoints;
              for(var i = 0 ; i < pointList.length ; i++){
                pointList[i].markerActivity = false;
              }
              this.setState({
                curMapPoints: pointList
              }, ()=>{this.createClusters()})
            }    
          }}
         >
          { this.renderMarkers() }
          {/* {this.createMarkersForRegion_Places()} */}
      </MapView>
    );
  }
}
