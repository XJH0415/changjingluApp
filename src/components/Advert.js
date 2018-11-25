/**
 * 广告轮播图组件
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import Swiper from 'react-native-swiper';
import API from '../lib/dataApi';

const deviceWidth = Dimensions.get('window').width;      //设备的宽度

export default class Advert extends Component {

  static defaultProps={

  }

  state={
    data: null,
    records: null,

  }

  _ImageBtn(id){
    var navigate= this.props.navigate;
    let that = this;
    API.getNewsPlain('projects','1','', 1, (result)=>{
      for (let records of result.records){
        if (id === '0' && records.article_id === '62'){
          navigate('NewDetail', {data: records})
        }
        if (id === '1' && records.article_id === '400'){
          navigate('NewDetail', {data: records})
        }
      }
    })
  }
  componentWillMount(){
    // let that =this;
    // API.getAdsInfo((data)=>{
    //   if (data){
    //     that.setState({
    //       data:data,
    //     })
    //   }
    // },(error)=>{
    // })
  }

  render() {
    var {data, req}=this.state;
    // var records=[];
    // var newRecords=[];
    // if (data&&data.records){
    //   records = data.records;
    //   for (let rec of records){
    //     if (rec.key !== 'home.right.1') {
    //       newRecords.push(rec);
    //     }
    //   }
    //   if (!newRecords||newRecords.length < 3 ){
    //     for (let defaultSrc of data.default.src){
    //       if (defaultSrc.indexOf('https://')===-1){
    //         defaultSrc='https://'+defaultSrc;
    //       }
    //       newRecords.push({url: data.default.url, image_large: defaultSrc})
    //       if (newRecords.length === 3){
    //         break;
    //       }
    //     }
    //   }
    // }

    return(
      <View  style={styles.root}>
        <Swiper style={styles.root}
                autoplay={true}
                autoplayTimeout={5}
                showsButtons={false}
                // key = {records.length}
                removeClippedSubviews={false}
        >
          <TouchableWithoutFeedback style={styles.imgView} onPress={()=>{this._ImageBtn('0')}}>
            <Image source={require('../resource/advert_logo1.jpg')} resizeMode='stretch' style={styles.bannerImg} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.imgView} onPress={()=>{this._ImageBtn('1')}}>
            <Image source={require('../resource/advert_logo2.jpg')} resizeMode='stretch' style={styles.bannerImg} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.imgView} onPress={()=>{this._ImageBtn('0')}}>
            <Image source={require('../resource/advert_logo3.jpg')} resizeMode='stretch' style={styles.bannerImg} />
          </TouchableWithoutFeedback>
          {/*{*/}
              {/*newRecords.map((item,index)=>{*/}
                {/*// var source=require(req[index]);*/}
                {/*return (*/}
                  {/*<View style={styles.imgView} key={index}>*/}
                    {/*<TouchableWithoutFeedback onPress={()=>{this._ImageBtn(item)}}>*/}
                      {/*<Image source={require(req[index])} resizeMode='stretch' style={styles.bannerImg} />*/}
                      {/*/!*<Image source={require('../resource/advertLogo.png')} resizeMode='stretch' style={styles.bannerImg} />*!/*/}
                    {/*</TouchableWithoutFeedback>*/}
                  {/*</View>*/}
                {/*)*/}
              {/*})*/}
          {/*}*/}

        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root:{
    height:120,
  },

  imgView: {
    flex:1,
  },
  bannerImg:{
    height:120,
    width:deviceWidth
  }
})


