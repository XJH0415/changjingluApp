import React, {Component} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native';

export default class CoinItem extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={{width:30}}><Text style={styles.text}>1</Text></View>
        <Image style={{width:30}} />
        <View style={{minWidth:80}}><Text style={[styles.text,{textAlign:'left'}]}>名称</Text></View>
        <View style={{flex:1}}><Text style={[styles.text,{textAlign:'right'}]}>价格</Text></View>
        <View style={{minWidth:80}}><Text style={[styles.text,{textAlign:'right'}]}>量</Text></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#171B35',
    paddingLeft:10,
    paddingRight:10
  },
  text:{
    color:'white',
  },
})