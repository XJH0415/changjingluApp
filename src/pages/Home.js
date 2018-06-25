import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import Advert from '../components/Advert';
import Notice from '../components/Notice';

export default class Home extends Component{
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        <Advert/>
        <Notice/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});