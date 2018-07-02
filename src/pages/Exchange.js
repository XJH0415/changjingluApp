import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from '../components/Header';
export default class Exchange extends Component{
  render() {
    return (
      <View style={styles.root}>
        <Header titles={['交易所']} searchType={'exchange'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});