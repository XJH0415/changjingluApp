import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
  TouchableOpacity
} from 'react-native';

export  default class PairItem extends Component {
  static defaultProps={
    data:{
      id:1001,
      pair:'BTC/USD',
      exchange:'火币全球专业站',
      price:40005.254,
      vol:12045.254,
      change:0.05124,
    }
  }

  render() {
    var {data:{id,pair,exchange,price,vol,change}}=this.props;
    return (
      <TouchableOpacity style={styles.root}>
        <View style={styles.img}>
          <Image />
        </View>

        <View style={styles.leftView}>
          <View >
            <Text style={[styles.text]}>{pair}</Text>
          </View>
          <View >
            <Text style={[styles.text]}>{exchange}</Text>
          </View>
        </View>

        <View style={styles.centerView}>
          <View >
            <Text style={[styles.text]}>￥{price.toFixed(2)}</Text>
          </View>
          <View >
            <Text numberOfLines={1} style={[styles.text,styles.grayText]}>量(24h):{vol.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.rightView}>
          <Text style={[styles.text,styles.grayText]}>占比</Text>
          <Text style={[styles.text]}>{(change*100).toFixed(2)}%</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    paddingLeft:5,
    paddingRight:5,
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white'
  },
  img:{
    width:30,
    height:30,
    backgroundColor:'red',
    marginRight:5,

  },
  text:{
    overflow:'hidden'
  },
  grayText:{
    color:'gray',
    fontSize:12
  },
  leftView:{
    justifyContent:'center',
  },
  centerView:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    marginRight:5,
    marginLeft:5
  },
  rightView:{
    justifyContent:'center',
    alignItems:'center'
  }

});  