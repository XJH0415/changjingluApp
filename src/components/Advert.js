/**
 * 广告轮播图组件
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Advert extends Component {

  static defaultProps={
    data:{
      imgUrls: [
        'https://changjinglu.info/asset/img/default.ads0.jpg',
        'https://changjinglu.info/asset/img/default.ads1.jpg',
      ]}
  }

  render() {
    var {data:{imgUrls}}=this.props;
    return(
      <View  style={styles.root}>
        <Swiper style={styles.root}
                showsButtons={true} autoplay={true}
                autoplayTimeout={5}>
          {
            imgUrls.map((item,index)=>{
              var source={uri:item};
              return (
                <View style={styles.imgView} key={index}>
                  <Image source={source} resizeMode='stretch' style={styles.bannerImg} />
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
    height:200,
  },

  imgView: {
    flex:1,
  },
  bannerImg:{
    height:200,
  }
})


