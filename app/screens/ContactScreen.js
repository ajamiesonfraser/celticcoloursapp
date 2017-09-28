import React, { Component} from 'react'
import {Linking, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native'
// import call from 'react-native-phone-call'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call'
var Mailer = require('NativeModules').RNMail
import ViewContainer from '../components/ViewContainer'

var { width, height } = Dimensions.get('window');

class ContactScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            email:'',
            message:'',
        }
        
    }
    
    componentDidMount() {
    }

    callPhone(number){
        // const args = {
        //     number:number,
        //     prompt:false
        // }
        // call(args).catch(console.error);
        RNImmediatePhoneCall.immediatePhoneCall(number)
    }

    sendMail(mail, name, message){
        Mailer.mail({
            subject:'',
            recipients: [mail],
            ccRecipients: [''],
            bccRecipients: [''],
            body: message,
            isHTML: true,
        }, (error, event)=>{
            if(error){
                console.log('Could not send mail. Please send a mail to ' + mail)
            }
        })
    }

    handleClick(url){
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log('Don\'t know how to open URI: ' + url);
          }
        });
      };

    renderMessageView(){
        return(
            <View style={{ paddingHorizontal: 50, paddingTop:20 }}>
                <Text style={{textAlign:'center'}}>Message the Celtic Colours Box{'\n'}Office to enquire about Events</Text>
                <View style={{paddingTop:20}} />
                <TextInput 
                    style={{height:40, borderColor:'gray', borderWidth:1}} 
                    placeholder="  Name"
                    onChangeText={(text)=>this.state.name = text}
                />
                <View style={{paddingTop:20}} />
                <TextInput 
                    style={{height:40, borderColor:'gray', borderWidth:1}} 
                    placeholder="  Email"
                    keyboardType={'email-address'}
                    onChangeText={(text)=>this.state.email = text}
                />
                <View style={{paddingTop:20}} />
                <TextInput 
                    multiline = {true}
                    numberOfLines = {4}
                    style={{height:160, borderColor:'gray', borderWidth:1}} 
                    placeholder="  Message"
                    onChangeText={(text)=>this.state.message = text}
                />
                <View style={{paddingTop:20, alignItems:'flex-end'}}>
                    <TouchableOpacity 
                        style={{width:width / 4, alignItems:'center', borderColor:"#0076FF", borderWidth:1, borderRadius:20}} 
                        onPress={()=>{
                            this.sendMail(this.state.email, this.state.name, this.state.message)
                        }}>
                        <Text style={{color:"#0076FF"}}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderContactInfoView(){
        return (
            <View style={{ paddingHorizontal: 40, paddingTop:20 }}>
                <View style={{flexDirection:"row"}}>
                    <Image style={{width:30, height:30}} source={require('../assets/phone-icon.png')}/>
                    <View style={{paddingLeft:20}}>
                        <Text>Phone</Text>
                        <View style={{paddingTop:10}} />
                        <TouchableOpacity onPress={()=>{
                            this.callPhone("19025673000")
                            }}>
                            <Text style={{color:"#0076FF"}}>1-902-567-3000</Text>
                        </TouchableOpacity>
                        <View style={{paddingTop:10}} />
                        <Text>Toll Free</Text>
                        <View style={{paddingTop:10}} />
                        <TouchableOpacity onPress={()=>{
                            this.callPhone("18883557744")
                            }}>
                            <Text style={{color:"#0076FF"}}>1-888-355-7744</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:"row", paddingTop:20}}>
                    <Image style={{width:30, height:30}} source={require('../assets/email-icon.png')}/>
                    <View style={{paddingLeft:20}}>
                        <Text>Email</Text>
                        <View style={{paddingTop:10}} />
                        <TouchableOpacity onPress={()=>{
                            this.sendMail('app@celtic-colours.com', '', '')
                            }}>
                            <Text style={{color:"#0076FF"}}>app@celtic-colours.com</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
                <View style={{flexDirection:"row", paddingTop:20}}>
                    <Image style={{width:30, height:30}} source={require('../assets/location-icon.png')}/>
                    <View style={{paddingLeft:20}}>
                        <Text>Address</Text>
                        <View style={{paddingTop:10}} />
                        <TouchableOpacity onPress={()=>{
                            this.handleClick('https://maps.google.com/?q=37 Nepean Street Sydney, NS B1P 6A7 Canada')
                            }}>
                            <Text style={{color:"#0076FF"}}>37 Nepean St.{'\n'}Sydney, NS{'\n'}B1p 6A7</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return(
            <ViewContainer>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        {this.renderMessageView()}
                        {this.renderContactInfoView()}
                    </ScrollView>
                </View>
            </ViewContainer>
        )
    }
}

const styles = StyleSheet.create({
    
  
  });

module.exports = ContactScreen