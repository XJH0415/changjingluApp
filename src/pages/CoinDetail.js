import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

export default class CoinDetail extends Component{
  static navigationOptions=(options)=>({
    headerTitle:'币详情',
  });
  static defaultProps={
    coin:{
      id:1,
      code:'BTC'
    }
  }
  render() {
    var {coin}=this.props;
    console.log(coin.code)
    return (
      <View style={styles.root}>
        <Text>{coin.code}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});