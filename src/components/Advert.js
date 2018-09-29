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

  }

  state={
    data: null,
    records: null,
  }
  _ImageBtn(item){
    var navigate= this.props.navigate;
    let that = this;
    API.getNewsPlain('projects','1','', 1, (result)=>{
      for (let records of result.records){
        if (item.url.indexOf(records.article_id) !== -1){
          // alert(JSON.stringify(records))
          that.setState({
            records:records
          })
          navigate('NewDetail', {data: records})
        }
      }
    })
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
    var newRecords=[];
    if (data&&data.records){
      records = data.records;
      for (let rec of records){
        if (rec.key !== 'home.right.1') {
          newRecords.push(rec);
        }
      }
      if (!newRecords||newRecords.length < 3 ){
        for (let defaultSrc of data.default.src){
          if (defaultSrc.indexOf('https://')===-1){
            defaultSrc='https://'+defaultSrc;
          }
          newRecords.push({url: data.default.url, image_large: defaultSrc})
          if (newRecords.length === 3){
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
                key = {records.length}
        >
          {
            newRecords.map((item,index)=>{
              var source={uri:item.image_large};
              return (
                <View style={styles.imgView} key={index}>
                  <TouchableOpacity onPress={()=>{this._ImageBtn(item)}}>
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
    height:200,
  },

  imgView: {
    flex:1,
  },
  bannerImg:{
    height:200,
  }
})


