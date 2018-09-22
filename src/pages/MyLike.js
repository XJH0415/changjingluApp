/**
 * 我的自选
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

export  default class MyLike extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '我的自选';
    return {
      headerTitle: headerTitle
    };
  };

  render() {
    return (
      <View style={styles.root}>

      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
  },

});