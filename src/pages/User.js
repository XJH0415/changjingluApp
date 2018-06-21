import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class User extends Component{
  render() {
    return (
      <View style={styles.root}>
        <Text>个人中心</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});