import React, {Component} from 'react';
import {StyleSheet, View, Image, ImageBackground, Text, Dimensions} from 'react-native';
import LocalStorage from "../utils/LocalStorage";

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class UserIndex extends Component {
  static defaultProps ={
    goback :()=>{},
    GuessRecord:()=>{},
    data: null
  }
  state={
    data:this.props.data
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data:nextProps.data,
    })
  }

  render() {
   
    var {goback, GuessRecord} =this.props;
    var {data} = this.state;
    return(
      <View style={styles.roots}>

        <View style={styles.nameImg}>
          <Image
            style={styles.image}
            source={{uri: data.avatar}}
          />
          <View style={styles.namePhone}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.phone}>{data.phone.substring(0,3)+'******'+data.phone.substring(9)}</Text>
          </View>
          <View style={styles.totalNumView}>
            <Text style={styles.totalNum}>{data.points}CJL</Text>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>猜涨跌记录 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>积分记录 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>收藏的文章 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>修改密码 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </View>

        <View style={styles.gobackView}>
          <Text onPress={()=>{goback()}} style={styles.goBack}>退出登录</Text>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  roots: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gobackView:{
    height: 30,
    marginTop: 20,
    justifyContent:'center',
    alignItems: 'center',
  },
  goBack: {
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#4A90E2',
    fontSize: 16,
    color:'#ffffff',
  },
  nameImg: {
    height: 80,
    width: deviceWidth,
    backgroundColor: '#e2f3ef',
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  namePhone: {
    marginLeft:10,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 20,
    fontWeight:'bold',
  },
  phone: {
    fontSize: 15,
  },
  total: {
    marginTop: 5,
    marginLeft: 5,
    height: 40,
    width: deviceWidth,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  totalImgTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalImg: {
    width: 20,
    height: 20,
    marginRight:5,
    marginLeft: 10,
  },
  totalText:{
    fontSize: 16,
  },
  totalNumView:{
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  totalNum: {
    color: '#000000',
    fontSize: 15,
  },
  totalArrow:{
    alignItems: 'flex-end',
    marginRight: 10,
    width: 20,
    height: 20,
  },
});


