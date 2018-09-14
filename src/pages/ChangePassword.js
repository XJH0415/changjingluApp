/**
 * 修改密码
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions, AsyncStorage,
} from 'react-native';
import API from "../lib/dataApi";

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class ChangePassword extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '修改密码';
    return {
      headerTitle: headerTitle
    };
  };

  state={
    error:'密码长度6-18位任意数字字符',
    oldPassword:null,
    newPassword:null,
    reNewPassword:null,
  };

  _oldPassword(oldPassword) {
    oldPassword === '' ? this.setState({ error : '请输入旧密码' })
      : this.setState({oldPassword : oldPassword, error : null});
  }
  _newPassword(newPassword) {
    newPassword === '' ? this.setState({ error : '请输入新密码' })
      : newPassword.length < 6 || newPassword.length > 18 ? this.setState({ error : '新密码长度6-18位' })
        : this.setState({newPassword : newPassword, error : null});
  }
  _reNewPassword(reNewPassword) {
    reNewPassword === '' ? this.setState({ error : '请重复新密码' })
      : reNewPassword !== this.state.newPassword ? this.setState({ error : '密码不一致，请重新输入' })
        : reNewPassword.length < 6 || reNewPassword.length > 18 ? this.setState({ error : '新密码长度6-18位' })
          : this.setState({reNewPassword : reNewPassword, error : null});
  }

  _onChangePassword(){
    var {oldPassword, newPassword, reNewPassword, error} = this.state;
    if ( !oldPassword || !newPassword || !reNewPassword) {
      this.setState({error : '密码不能为空'});
      return;
    }
    var that = this;
    API.changePassword(oldPassword, newPassword);
  }

  render() {
    var {error, } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.inputView}>
          <TouchableOpacity
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              placeholderTextColor={'#b1b1b1'}
              placeholder={'旧密码'}
              selectionColor={'#000000'}
              onChangeText={(oldPassword)=>{this._oldPassword(oldPassword)}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              placeholderTextColor={'#b1b1b1'}
              placeholder={'新密码'}
              selectionColor={'#000000'}
              onChangeText={(newPassword)=>{this._newPassword(newPassword)}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              placeholderTextColor={'#b1b1b1'}
              placeholder={'重复新密码'}
              selectionColor={'#000000'}
              onChangeText={(reNewPassword)=>{this._reNewPassword(reNewPassword)}}
            />
          </TouchableOpacity>
          <Text style={[styles.error,error === '密码长度6-18位任意数字字符' ? {color:'#b1b1b1'}:{}]}>{error}</Text>
        </View>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.changeRow} onPress={()=>{this._onChangePassword()} }>确认修改</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  inputView:{
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    margin: 5,
  },
  error:{
    height: 30,
    color: '#ff0000',
    fontSize: 16,
    marginTop: 5,
  },
  row:{
    height: 50,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeRow:{
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#4A90E2',
    fontSize: 16,
    color: '#ffffff',
  }
})