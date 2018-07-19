import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export  default class SitePairItem extends Component {
  static defaultProps={
    ticker:null,
    total:0,
    time:0
  }
  
  render() {
    var {ticker:{pair_key,price,vol,update_time},total,time}=this.props;
    return (
      <TouchableOpacity style={styles.root}>
        <View style={styles.leftView}>
          <View >
            <Text style={[styles.text,{fontWeight:'bold'}]}>{pair_key.replace('_','/').toUpperCase()}</Text>
          </View>
          <View >
            <Text style={[styles.text]}>额(24h):{(vol*price).toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.centerView}>
          <View >
            <Text style={[styles.text]}>￥{(price*1).toFixed(2)}</Text>
          </View>
          <View >
            <Text numberOfLines={1} style={[styles.text,styles.grayText]}>量(24h):{(vol*1).toFixed(0)}</Text>
          </View>
        </View>
        
        <View style={styles.rightView}>
          <Text style={[styles.text,styles.grayText]}>占比</Text>
          <Text style={[styles.text,styles.grayText]}>{(vol*price/total).toFixed(2)}%</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.text,styles.grayText]}>{this._formartDate(time,update_time)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  _formartDate(time,update_time){
    var s = time-update_time;
    var str='';
    if(s<60){
      str = s+'秒前';
    }
    if(s>60){
      str = parseInt(s/60)+'分钟前';
    }
    if(s>3600){
      str = parseInt(s/3600)+'小时前';
    }
    return str;
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
    marginLeft:5,
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