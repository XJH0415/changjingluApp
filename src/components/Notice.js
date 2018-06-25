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
        '111111111111111111111111111111111111111111',
        '222222222222222222222222222222222222222222',
        '333333333333333333333333333333333333333333',
      ]}
  }
  render() {
    var {data:{Notice}}=this.props;
    return(
      <View  style={styles.root}>
        <View style={styles.imgView}>
          <View style={styles.img}/>
        </View>
        <Swiper style={styles.imgWrapper} height={18}
                horizontal={false} showsPagination={false}
                showsButtons={false} autoplay={true} showsVerticalScrollIndicator={true}
                autoplayTimeout={2}>
          {
            Notice.map((item,index)=>{
              return (
                <View style={styles.textView} key={index}>
                  <Text style={styles.bannerText} numberOfLines={1}>{item}</Text>

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
    margin:5,
    height:60,
    flexDirection:'row',
  },
  imgView: {
    margin:1,
    width:60,
    height:60,
    borderWidth:1,
    borderColor:'blue',
  },
  textView: {
    margin:2,
    flex:1,
  },
  bannerText:{
    paddingLeft:30,
    paddingRight:30,
    flex:1,
    fontSize:12,
    top:'30%',
  }
})
