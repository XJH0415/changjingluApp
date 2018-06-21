import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class New extends Component{
  render() {
    return (
      <View style={styles.root}>
        <Text>资讯</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});