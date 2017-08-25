import React, { Component} from 'react'
import { WebView } from 'react-native'

class ContactScreen extends Component {
    render(){
        return(
            <WebView
                source={{uri:'https://celtic-colours.com/contact/'}}/>
        )
    }
}
module.exports = ContactScreen