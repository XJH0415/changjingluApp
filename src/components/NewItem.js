import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default class NewItem extends Component {
  static defaultProps={
    data:{
      title:'标题',
      writer:'作者',
      time:'yyyy-MM-dd',
      clickRate:'0',
      imtUrl:'https://changjinglu.info/asset/img/default.ads0.jpg'
    }
  }
  render() {
    var {data:{title,writer,time,clickRate,imtUrl}}=this.props;
    return (
      <View style={styles.container}>
        <Image source={{uri: imtUrl}} style={styles.image} resizeMode='stretch'></Image>
        <View style={styles.right}>
          <View style={styles.titleForm}>
            <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
          </View>
          <View style={styles.listForm}>
            <View>
              <Text style={[styles.text,styles.time]}>{time}</Text>
            </View>
            <View style={styles.writer}>
              <Text style={[styles.text,styles.writerName]} numberOfLines={1}>{writer}</Text>
            </View>
            <Image source={require('../resource/clickRate.png')} style={styles.clickRateImg} resizeMode='stretch'/>
            <View>
              <Text style={[styles.text,styles.time]}>{clickRate}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:90,
    borderBottomColor:'#E6E6FA',
    flexDirection:'row',
    backgroundColor:'white'

  },
  image: {
    height:70,
    width:100,
    margin:10,
  },
  right: {
    flex:1,
    margin:10,
    marginLeft:0,
  },
  titleForm:{
    height:45,
  },
  titleText:{
    flex:1,
    fontSize:18,
    fontWeight:'bold',
    overflow: 'hidden',

  },
  listForm:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:3,
  },
  time:{
    color:'#8F8F8F',
  },
  writer:{
    flex:1,
    marginLeft:5,
  },
  clickRateImg:{
    height:12,
    width:16,
  },
  writerName:{
    overflow: 'hidden',
  },
  text:{
    fontSize:14,
  },
});
