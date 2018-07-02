import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from '../components/Header';
export default class User extends Component{
  render() {
    return (
      <View style={styles.root}>
        <Header titles={['我的长颈鹿']} showSearch={false}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});