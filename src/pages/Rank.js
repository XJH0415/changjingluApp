import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Rank extends Component{
  render() {
    return (
      <View style={styles.root}>
        <Text>排行榜</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});