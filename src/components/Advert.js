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
import API from '../lib/dataApi';

export default class Advert extends Component {

  static defaultProps={
    data:{
      imgUrls: [
        'https://changjinglu.pro//uploads//image//ff6//19fc2abf09224b9dd4525c54906bd548.png',
        'https://changjinglu.pro//uploads//image//6c7//da2264dc4d5bdf6f6da05659448db453.jpg',
        'https://changjinglu.pro//uploads//image//967//852c109102b4eba696e51b5b2596a282.jpg',
      ]}
  }

  state={
    data: null,
  }
  _ImageBtn(item){

  }
  componentDidMount(){
    let that =this;
    API.getAdsInfo((data)=>{
      if (data){
        that.setState({
          data:data,
        })
      }
    },(error)=>{
    })
  }

  render() {
    var {data}=this.state;
    var records=[];
    if (data&&data.records){
      records = data.records;
      if (!records||records.length < 3 ){
        for (let defaultSrc of data.default.src){
          if (defaultSrc.indexOf('https://')===-1){
            defaultSrc='https://'+defaultSrc;
          }
          records.push({url: data.default.url, image_large: defaultSrc})
          if (records.length === 3){
            break;
          }
        }
      }
    }
    return(
      <View  style={styles.root}>
        <Swiper style={styles.root}
                autoplay={true}
                autoplayTimeout={5}
                showsButtons={false}
        >
          {
            records.map((item,index)=>{
              var source={uri:item.image_large};
              return (
                <View style={styles.imgView} key={index}>
                  <TouchableOpacity onPress={(item)=>{this._ImageBtn(item)}}>
                    <Image source={source} resizeMode='stretch' style={styles.bannerImg} />
                    {/*<Image source={require('../resource/advertLogo.png')} resizeMode='stretch' style={styles.bannerImg} />*/}
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
    height:160,
  },

  imgView: {
    flex:1,
  },
  bannerImg:{
    height:160,
  }
})


