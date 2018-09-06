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
    alert(JSON.stringify(data))
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
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Image style={styles.totalImg} source={require('../resource/integral.png')}/>
            <Text style={styles.totalText}>我的积分 </Text>
          </View>
          <View>
            <Text style={styles.totalNum}>{data.points} 积分</Text>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Image style={styles.totalImg} source={require('../resource/GuessRecord.jpg')}/>
            <Text style={styles.totalText}>猜涨跌记录 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.jpg')}/>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Image style={styles.totalImg} source={require('../resource/integral.png')}/>
            <Text style={styles.totalText}>积分记录 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.jpg')}/>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Image style={styles.totalImg} source={require('../resource/Collection.jpg')}/>
            <Text style={styles.totalText}>收藏的文章 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.jpg')}/>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.totalImgTxt}>
            <Image style={styles.totalImg} source={require('../resource/ChangePassword.jpg')}/>
            <Text style={styles.totalText}>修改密码 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.jpg')}/>
          </View>
        </View>

        <View style={styles.total}>
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
  goBack: {
    width:deviceWidth,
    color: 'blue',
    fontSize: 15,
    alignItems: 'center',
  },
  nameImg: {
    height: 100,
    width: deviceWidth,
    backgroundColor: '#96c2ff',
    flexDirection: 'row',
    padding: 20,
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
    height: 30,
    lineHeight:30,
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
    fontSize: 20,
  },
  totalNum: {
    color: '#b1b1b1',
    fontSize: 15,
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  totalArrow:{
    alignItems: 'flex-end',
    marginRight: 10,
    width: 20,
    height: 20,
  },
});


