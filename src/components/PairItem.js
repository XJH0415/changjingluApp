import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';

export  default class PairItem extends Component {
  static defaultProps={
    data:{
      id:1001,
      pair:'BTC/USD',
      exchange:'火币',
      price:40005.254,
      vol:12045.254,
      change:-0.05124,
    }
  }

  render() {
    var {data:{id,pair,exchange,price,vol,change}}=this.props;
    return (
      <View style={styles.root}>
        <View style={styles.img}>
          <Image />
        </View>

        <View style={styles.codeView}>
          <View style={styles.name}>
            <Text style={styles.pairName}>{pair}</Text>
          </View>
          <View >
            <Text style={styles.exchange}>{exchange}</Text>
          </View>
        </View>

        <View style={styles.priceView}>
          <View >
            <Text style={[styles.price,change>0?{color:'red'}:{color:'green'}]}>价格:{price.toFixed(2)}</Text>
          </View>
          <View >
            <Text style={styles.vol}>成交量:{vol.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.changeView}>
          <Text style={change>0?{color:'red'}:{color:'green'}}>{(change*100).toFixed(2)}%</Text>
        </View>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    marginLeft:5,
    marginRight:5,
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  img:{
    width:30,
    height:30,
    backgroundColor:'red',
    margin:2,
  },
  exchange:{

  },
  codeView:{
    flexDirection:'column',
  },
  name:{

  },
  pairName:{
    fontWeight:'bold',
  },
  vol:{

  },
  priceView:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'flex-end',
  },
  price:{

  },

  changeView:{
    margin:5,
  },
});  