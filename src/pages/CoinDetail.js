import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CoinDetail extends Component{
  static navigationOptions=(options)=>({
    headerTitle:'币详情',
  })
  render() {
    return (
      <View style={styles.root}>
        <Text>交易所</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});