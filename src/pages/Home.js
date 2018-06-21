import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

export default class Home extends Component{
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        <Text>首页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});