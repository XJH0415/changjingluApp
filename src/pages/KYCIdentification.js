/**
 * KYC认证
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert, Dimensions, TextInput, ScrollView} from 'react-native';
import API from "../lib/dataApi";
import ImagePicker from "react-native-image-picker";
import PropTypes from "prop-types";

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class KYCIdentification extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = 'KYC身份认证';
    return {
      headerTitle: headerTitle
    };
  };

  static contextTypes={
    userKYCState: PropTypes.string,
    setContextState: PropTypes.func,
    getContextState: PropTypes.func,
  }

  static defaultProps = {

  };

  state = {
    changeImage1: null,
    changeImage1Name: null,
    changeImage2: null,
    changeImage2Name: null,
    identityId: null,
    identityName: null,
    error: null,
  };

  selectPhotoTapped(imgId) {
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
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = response.uri;
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        if (imgId === 'img1') {
          that.setState({
            changeImage1: source,
            changeImage1Name: response.fileName
          });
        } else {
          that.setState({
            changeImage2: source,
            changeImage2Name: response.fileName
          });
        }
        // alert(source+','+response.fileName)
      }
    });
  }

  _IdentityId(identityId) {
    var that = this;
    identityId ?
      that.IdentityCodeValid(identityId) ?
        that.setState({identityId: identityId, error: null,})
        :
        that.setState({error: '请输入有效身份证',})
      :
      that.setState({error: '请输入有效身份证',})
  }

  _IdentityName(identityName) {
    var that = this;
    identityName ?
      that.IdentityNameValid(identityName) ?
        that.setState({identityName: identityName, error: null,})
        :
        that.setState({error: '请输入正确姓名',})
      :
      that.setState({error: '请输入正确姓名',})
  }

  onSubmitExamine() {
    var {changeImage1, changeImage2, changeImage1Name, changeImage2Name, identityId, identityName, error} = this.state;
    var that = this;
    if (error){
      return Alert.alert('','亲,身份证或姓名输入错误，请重新输入')
    }
    if (!changeImage1 || !changeImage2){
      return Alert.alert('','亲，请上传完整的身份证')
    }
    if (changeImage1 && changeImage2 && changeImage1Name && changeImage2Name) {
      API.Authentication(changeImage1.trim(), changeImage1Name.trim())
        .then(result1 =>{
        if (result1.cards){
          API.Authentication(changeImage2, changeImage2Name).then(result2 =>{
            if(result2.cards){
              if(result1.cards[0].name === identityName.trim() && result1.cards[0].id_card_number === identityId.trim()){
                that.context.setContextState({userKYCState: '1'});
                API.SaveMsg('userKYCState', '1');
                // identityState: (kycState)=>{kycState: kycState},
                that.props.navigation.state.params.identityState('1');
                Alert.alert('','亲，KYC身份认证成功')
              }else{
                Alert.alert('', '亲，身份证号或姓名不一致,请重新输入')
              }
            }else{
              Alert.alert('', '亲，第二张身份证错误或无效,请重新添加')
            }
          }).catch(error => console.log(error))
        }else {
          Alert.alert('', '亲，第一张身份证错误或无效,请重新添加')
        }
      })
        .catch(error => console.log(error))
      //API.Authentication(changeImage2, changeImage2Name)

    } else {
      Alert.alert('', '亲，请上传完整的身份证')
    }
  }

  render() {
    var {changeImage1, changeImage2, error} = this.state;
    // alert(this.context.getContextState().userKYCState)
    var source1 = require('../resource/IdentityPositive.png');
    var source2 = require('../resource/IdentityOpposite.png');
    return (
        <View style={styles.root}>
          <View style={{marginTop: 10,}}>
            <TouchableOpacity
              style={styles.inputBox}>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#b1b1b1'}
                placeholder={'请输入真实姓名'}
                selectionColor={'#000000'}
                onChangeText={(identityName) => {
                  this._IdentityName(identityName)
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputBox}>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#b1b1b1'}
                placeholder={'请输入身份证号'}
                selectionColor={'#000000'}
                onChangeText={(identityId) => {
                  this._IdentityId(identityId)
                }}
              />
            </TouchableOpacity>
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{error ? error : ''}</Text>
            </View>
          </View>
          <View style={{marginTop: 10,}}>
            <Text style={styles.topText}>请上传您的二代身份证</Text>
          </View>
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => {
              this.selectPhotoTapped('img1')
            }}>
              <Image style={styles.image} source={changeImage1 ? {uri: changeImage1} : source1}/>
            </TouchableOpacity>
          </View>
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => {
              this.selectPhotoTapped('img2')
            }}>
              <Image style={styles.image} source={changeImage2 ? {uri: changeImage2} : source2}/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.row} onPress={() => {
              this.onSubmitExamine()
            }}>
              <Text style={styles.changeRow}>提交审核</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20, paddingBottom: 20}}>
            <Text style={styles.topText}>信息仅用于身份验证，长颈鹿不会泄露您的信息</Text>
          </View>
        </View>
    )
  }

  /**
   * 姓名有效性验证
   * @param name
   * @returns {boolean}
   * @constructor
   */
  IdentityNameValid(name){
    var reg = /^[\u4E00-\u9FA5]{2,4}$/;
    if (reg.test(name)){
      return true;
    }else {
      return false;
    }
  }

  /**
   * 身份证有效性验证
   * @param code
   * @returns {boolean}
   * @constructor
   */
  IdentityCodeValid(code) {
    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = "请输入有效身份证号";
      pass = false;
    }

    else if (!city[code.substr(0, 2)]) {
      tip = "请输入有效身份证号";
      pass = false;
    }
    else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          tip = "请输入有效身份证号";
          pass = false;
        }
      }
    }
    if (!pass)
      this.setState({
        error: tip
      })
    return pass;
  }

}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topView: {
    height: 150,
  },
  topText: {
    color: '#000',
  },
  row: {
    marginTop: 10,
    height: 50,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeRow: {
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#4A90E2',
    fontSize: 16,
    color: '#ffffff',
  },
  image: {
    width: 200,
    height: 125,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#e2f3ef',
    backgroundColor: 'rgba(216, 216, 216, 0.20)',
    margin: 5,
    marginBottom: 0,
  },
  input: {
    width: 280,
    height: 30,
    fontSize: 16,
    margin: 0,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000000',//输入框输入的文本为白色
  },
  errorView: {
    height: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
})