import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import API from '../lib/dataApi'

export default class Notice extends Component {
  static defaultProps={
  }

  state={
    records:[]
  }

  _onNotice(){
    let that = this;
    API.getNewsPlain('', 1, '', 1, (data) => {
      if (data && data.records && data.records.length >= 5){
        var records= data.records.slice(0,4)
        that.setState({
          records: records
        })
      }

    });
  }

  componentDidMount(){
    this._onNotice();
  }

  render() {
    var {records} = this.state;
    var navigate= this.props.navigate;
    return(
      <View  style={styles.root}>
        <Swiper
                horizontal={false}
                showsPagination={false}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={6}
                key = {records.length}
        >
          {
            records.map((item,index)=>{
              return (
                <TouchableOpacity style={styles.textView} onPress={()=>{navigate('NewDetail',{data:item})}}>
                  <Text numberOfLines={1} style={styles.bannerText}>{item.title}</Text>
                </TouchableOpacity>
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
