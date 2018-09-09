/**
 * 修改密码
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  WebView,
} from 'react-native';
import API from "../lib/dataApi";

export default class ChangePassword extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '收藏的文章';
    if (navigation) {
      data = navigation.state.params.data
      if (data) {
        headerTitle = data.title
      }
    }
    return {
      headerTitle: headerTitle
    };
  };

  state={
    error:null,
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
    var {oldPassword, newPassword, reNewPassword} = this.state;
    var that = this;
    API.getOnChangePassword(oldPassword, newPassword, (data)=>{
      alert('2')
      alert(data)
      // that.setState({
      //
      // })
    })
  }

  render() {
    var {error, } = this.state;
    return (
      <View>
        <Text>修改密码</Text>
        <Text>密码长度6-18位任意数字字符</Text>
        <View style={styles.inputView}>
          <View
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
          </View>
          <View
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
          </View>
          <View
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
          </View>
          <Text style={styles.error}>{error}</Text>
        </View>
        <View>
          <Text onPress={()=>{this._onChangePassword()}}>确认修改</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  inputView:{

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
  },
})