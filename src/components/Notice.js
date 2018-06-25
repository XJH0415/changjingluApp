import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Notice extends Component {
  static defaultProps={
    data:{
      Notice: [
        '来长颈鹿参加邀请注册大赛，前10名奖BTC和ETH',
        '长颈鹿资讯为全球区块链团队开设专栏了，快来入驻吧',
        '长颈鹿资讯广告位招租，快来认领吧',
      ]}
  }
  render() {
    var {data:{Notice}}=this.props;
    return(
      <View  style={styles.root}>
        <Swiper
                horizontal={false} showsPagination={false}
                showsButtons={false} autoplay={true}
                autoplayTimeout={6}>
          {
            Notice.map((item,index)=>{
              return (
                <View style={styles.textView} key={index}>
                  <Text numberOfLines={1} style={styles.bannerText} numberOfLines={1}>{item}</Text>
                </View>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root:{
    height:40,
    backgroundColor:'white',
    paddingLeft:15,
    paddingRight:15
  },
  textView: {
    flex:1,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  bannerText:{
    fontSize:14,
    color:'#171B35',
    fontWeight:'900'
  }
})
