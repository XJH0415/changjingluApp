import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import Advert from '../components/Advert';
import Notice from '../components/Notice';
import CoinLine from '../components/CoinLine';

export default class Home extends Component{
  state={
    text:''
  }
  render() {
    var {text}=this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        <Advert/>
        <Notice/>
        <CoinLine/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});