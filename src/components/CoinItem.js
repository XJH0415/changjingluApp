import React, {Component} from 'react'
import {View, StyleSheet, Image, Text, Alert,TouchableOpacity} from 'react-native';
import NumUtils from '../utils/NumUtils';

export default class CoinItem extends Component {
  static defaultProps = {
    onPress:()=>{},
    sort: 'va',
    coin: {
      coin_id: null,
      url: null,
      icon: null,
      code: null,
      name_en: null,
      name_cn: null,
      price: null,
      circulation: null,
      vol_24h: null,
      gains_pct_1d: null
    },
    no: 1,
  }

  render() {
    var {sort, no,onPress ,coin, coin: {code, price, name_cn, icon, name_en}} = this.props;
    var text = this.getText(sort, this.props.coin);
    price = price.toFixed(2);
    return (
      <TouchableOpacity onPress={() => {
        onPress(coin)
      }}>
        <View style={styles.root}>
          <View style={{minWidth: 20}}><Text style={styles.text}>{no}</Text></View>
          <Image style={styles.image} source={{uri: icon}}/>
          <View style={{minWidth: 80,flex: 1}}><Text numberOfLines={1}
            style={[styles.text, {textAlign: 'left'}]}>{code+'-'+(name_cn?name_cn:name_en?name_en:'')}</Text></View>
          <View><Text style={[styles.text, {textAlign: 'right'}]}>{price}</Text></View>
          <View style={{minWidth: 100}}><Text style={[styles.text, {textAlign: 'right'}]}>{text}</Text></View>
        </View>
      </TouchableOpacity>
    )
  }

  getText(sort, coin) {
    switch (sort) {
      case 'va':
      case 'vd':
        return NumUtils.formatNum(coin.circulation * coin.price);
      case 'pa':
      case 'pd':
        return NumUtils.formatNum(coin.price);
      case 'ca':
      case 'cd':
        return NumUtils.formatNum(coin.circulation);
      case 'ta':
      case 'td':
        return NumUtils.formatNum(coin.vol_24h);
      case 'ga':
      case 'gd':
        if (coin.gains_pct_1d === '-999') {
          return '-';
        }
        return (coin.gains_pct_1d * 1).toFixed(2) + '%';
    }
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
  },
  text: {
    color: 'black',
    marginLeft: 3,
    paddingRight: 3,
    overflow: 'hidden',
  },
  image: {
    width: 20,
    height: 20,
    margin: 10
  },
  txt: {}
})