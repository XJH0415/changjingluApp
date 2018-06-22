import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CoinItem from '../components/CoinItem'

export default class Rank extends Component{
  render() {
    return (
      <View style={styles.root}>
        <View>1111</View>
        <CoinItem/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});