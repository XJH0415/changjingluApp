import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Exchange extends Component{
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