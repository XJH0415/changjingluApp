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
    ticker:{
      code: "1st_btc",
      pair: '',
      pct: "0.00",
      price: "1.0726",
      site: {
        icon: "https://changjinglu.pro/uploads/image/a58/b608ca0bd632d4ccbcd85b9cb9167550_200x200.png",
        name: "中币网",
      },
      site_id: "2",
      syb: "¥",
      update_time: "刚刚",
      vol: "507",
      vol_val: "543.48",
      watching: false
    }

  }

  render() {
    var {ticker:{code,site:{icon,name},price,vol,pct,update_time}}=this.props;
    return (
      <TouchableOpacity style={styles.root}>
        <View>
          <Image  style={styles.img} source={{uri: icon}}/>
        </View>

        <View style={styles.leftView}>
          <View >
            <Text style={[styles.text,{fontWeight:'bold'}]}>{code.replace('_','/').toUpperCase()}</Text>
          </View>
          <View >
            <Text style={[styles.text]}>{name.trim()}</Text>
          </View>
        </View>

        <View style={styles.centerView}>
          <View >
            <Text style={[styles.text]}>￥{price.trim()}</Text>
          </View>
          <View >
            <Text numberOfLines={1} style={[styles.text,styles.grayText]}>量(24h):{vol.trim()}</Text>
          </View>
        </View>

        <View style={styles.rightView}>
          <Text style={[styles.text,styles.grayText]}>占比</Text>
          <Text style={[styles.text,styles.grayText]}>{(pct*1).toFixed(2)}%</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.text,styles.grayText]}>{update_time.trim()}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    padding:5,
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white'
  },
  img:{
    width:30,
    height:30,
    marginRight:5,

  },
  text:{
    overflow:'hidden',
    color:'black'
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
    alignItems:'center',
    marginRight:5,
    marginLeft:5
  },
  timeView:{
    minWidth:40,
    justifyContent:'center',
    alignItems:'center'
  }
});  