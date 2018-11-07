import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, Alert} from 'react-native';
import LocalStorage from "../utils/LocalStorage";
import GuessRecord from "./GuessRecord";
import IntegralRecord from "./IntegralRecord";
import ImagePicker from 'react-native-image-picker';

import API from '../lib/dataApi'
import PropTypes from "prop-types";


const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class UserIndexs extends Component {

  static contextTypes={
    userState: PropTypes.string,
    userKYCState: PropTypes.string,
    userMsg: PropTypes.string,
    setContextState: PropTypes.func,
    getContextState: PropTypes.func,
  }

  static defaultProps = {
    goback: () => {
    },
    GuessRecord: () => {
    },
    data: null,
    navigation: null,
  }

  state = {
    data: this.props.data,
    result: null,
    oldAvatar : this.props.data.avatar,
    avatarSource : this.props.data.avatar,
    userMsg : null,
    kycState : null,
  }

  componentDidMount(){
    API.getLogMe((userMsg)=>{
      if (userMsg){
        this.setState({
          userMsg: userMsg,
        })
      }
    })
  }

  selectPhotoTapped() {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      var that = this;
      if (response.didCancel) {
        Alert.alert('提示', '上传图片错误');
      }
      else if (response.error) {
        Alert.alert('提示', '上传图片错误');
      }
      else if (response.customButton) {
        Alert.alert('提示', '上传图片错误');
      }
      else {
        let source = response.uri ;
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        that.setState({
          avatarSource: source
        });

        API.uploadImage(source, response.fileName);
      }
    });
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    })
  }

  render() {
    var {navigate} = this.props.navigation;
    var {goback, GuessRecord, } = this.props;
    var {data, avatarSource, result, userMsg, kycState} = this.state;
    var points = null;
    if (this.context && this.context.getContextState().userMsg){
      userMsg = this.context.getContextState().userMsg;
      avatarSource = userMsg.avatar
    }
    if (userMsg){
      points = userMsg.points;
    }

    return (
      <View style={styles.roots}>
        <View style={styles.nameImg}>
          <TouchableOpacity onPress={()=>{this.selectPhotoTapped()}}>
            <Image
              style={styles.image}
              source={avatarSource ? {uri: avatarSource} : require('../resource/noHeadImage.png')}
            />
          </TouchableOpacity>

          <View style={styles.namePhone}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.phone}>{data.phone}</Text>
          </View>
          <View style={styles.totalNumView}>
            <Text style={styles.totalNum}>{points}CJL</Text>
          </View>
        </View>

        {/*<TouchableOpacity style={styles.total} onPress={() => {*/}
          {/*navigate('MyNews', {data: data})*/}
        {/*}}>*/}
          {/*<View style={styles.totalImgTxt}>*/}
            {/*<Text style={styles.totalText}>测试</Text>*/}
          {/*</View>*/}
          {/*<View>*/}
            {/*<Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>*/}
          {/*</View>*/}
        {/*</TouchableOpacity>*/}

        <TouchableOpacity style={styles.total} onPress={() => {
          navigate('GuessRecord', {data: data})
        }}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>猜涨跌记录 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.total} onPress={() => {
          navigate('IntegralRecord', {data: data})
        }}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>积分记录 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.total} onPress={() => {
          navigate('CollectionArticles', {data: data})
        }}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>收藏的文章 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.total} onPress={() => {
          navigate('ChangePassword', {data: data})
        }}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>修改密码 </Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </TouchableOpacity>

        {/*<TouchableOpacity style={styles.total} onPress={() => {*/}
          {/*navigate('KYCIdentification', {data: data, identityState: (kycState)=>{this.setState({kycState:kycState})}})*/}
        {/*}}>*/}
          {/*<View style={styles.totalImgTxt}>*/}
            {/*<Text style={styles.totalText}>*/}
              {/*身份实名认证{ this.context.getContextState().userKYCState === '1' || kycState=== '1' ? '(已认证)' : ''}*/}
            {/*</Text>*/}
          {/*</View>*/}
          {/*<View>*/}
            {/*<Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>*/}
          {/*</View>*/}
        {/*</TouchableOpacity>*/}

        <TouchableOpacity style={styles.total} >
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>当前版本 1.1.2</Text>
          </View>
        </TouchableOpacity>

        {
          userMsg &&userMsg.role === 'admin' ?
            <TouchableOpacity style={styles.total} onPress={() => {
              navigate('BackStageManagement', {navigation: navigate})
            }}>
              <View style={styles.totalImgTxt}>
                <Text style={styles.totalText}>后台管理</Text>
              </View>
              <View>
                <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
              </View>
            </TouchableOpacity>
            :
            <View/>
        }

        <TouchableOpacity style={styles.gobackView} onPress={() => {goback()}}>
          <View style={styles.goBack}>
            <Text style={styles.gobackTxt}>退出登录</Text>
          </View>
        </TouchableOpacity>


        {/*{*/}
          {/*userMsg &&userMsg.role === 'admin' ?*/}
            {/*<TouchableOpacity style={styles.total} onPress={() => {*/}
              {/*navigate('Test', {navigation: navigate})*/}
            {/*}}>*/}
              {/*<View style={styles.totalImgTxt}>*/}
                {/*<Text style={styles.totalText}>测试页面</Text>*/}
              {/*</View>*/}
              {/*<View>*/}
                {/*<Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>*/}
              {/*</View>*/}
            {/*</TouchableOpacity>*/}
            {/*:*/}
            {/*<View/>*/}
        {/*}*/}

      </View>
    )
  }
}


const styles = StyleSheet.create({
  roots: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gobackView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#4A90E2',
  },
  gobackTxt:{
    fontSize: 16,
    color: '#ffffff',
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
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
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
    marginRight: 5,
    marginLeft: 10,
  },
  totalText: {
    fontSize: 16,
  },
  totalNumView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  totalNum: {
    fontSize: 15,
  },
  totalArrow: {
    alignItems: 'flex-end',
    marginRight: 10,
    width: 20,
    height: 20,
  },
});


