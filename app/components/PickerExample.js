import React, { Component } from 'react';
import { Picker, StyleSheet } from 'react-native';

export default PickerExample = (props) => {

   return (

      <Picker selectedValue = {props.language} onValueChange = {props.updateLanguage}>
         <Picker.Item label = "Java" value = "java" />
         <Picker.Item label = "JavaScript" value = "js" />
      </Picker>

   )
}

const styles = StyleSheet.create ({

})
