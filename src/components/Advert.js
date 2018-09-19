/**
 * 广告轮播图组件
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Advert extends Component {

  static defaultProps={
    data:{
      imgUrls: [
        'https://changjinglu.pro/uploads/image/d75/9748608565bb208a90001e8b48331b20_390x200.png',
        'https://changjinglu.pro/uploads/image/566/49a9240b0892928588aeee2bca411128_390x200.jpg',
      ]}
  }

  render() {
    var {data:{imgUrls}}=this.props;
    return(
      <View  style={styles.root}>
        <Swiper style={styles.root}
                autoplay={true}
                autoplayTimeout={5}
                showsButtons={false}
        >
          {
            imgUrls.map((item,index)=>{
              var source={uri:item};
              return (
                <View style={styles.imgView} key={index}>
                  <TouchableOpacity>
                    <Image source={source} resizeMode='stretch' style={styles.bannerImg} />
                  </TouchableOpacity>
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


