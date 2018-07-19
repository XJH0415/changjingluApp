import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity
} from 'react-native';
import Header from '../components/Header';
import API from '../lib/dataApi';

export default class User extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Header titles={['我的长颈鹿']} showSearch={false}/>
        <WebView style={styles.root} source={
          {
            uri: 'https://changjinglu.pro/signin',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            form:{
              app:0
            }
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});