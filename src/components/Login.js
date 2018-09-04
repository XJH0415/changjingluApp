import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  Button,
  AsyncStorage
} from 'react-native';
import API from '../lib/dataApi';
import LocalStorage from "../utils/LocalStorage";

export default class Login extends Component {
  constructor(props){
    super(props);
    this._onChangePhone = this._onChangePhone.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
  }
  state = {
    phone:null,
    password:null,
    errors:null,
    userMsg:null,
  }
  static defaultProps = {
    onRegisterPress: () => {},
    onLoginPress: () => {},
    type:'',
  }

  _onChangePhone(phone) {
    phone === null ? this.setState({ errors : '请输入手机号' })
      : this.setState({phone : phone, errors : null});
  }
  _onChangePassword(password) {
    password === null ? this.setState({ errors : '请输入密码' })
      : this.setState({password : password, errors : null});
  }

  Login() {
    // alert(this.state.phone+','+this.state.password);
    var {phone,password} = this.state;
    var {onLoginPress } =this.props;
    phone === null || password === null ? this.setState({ errors : '用户名或密码不能为空',})
      : API.getLogin(phone, password, (data) => {
          if (data === false){
            this.setState({
              errors:'用户名或密码错误'
            });
          }else {
            LocalStorage.Deletes();
            LocalStorage.Save(data);
            onLoginPress(data);
          }
        })
  }

  render() {
    var {onRegisterPress } =this.props;
    var {errors, userMsg} =this.state;
    return (
      <View style={styles.root}>
        <TouchableOpacity
          activeOpacity={1.0}  //设置背景被点击时的透明度改变值
          style={styles.container}>
          <View
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'  //设置首字母不自动大写
              underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
              placeholderTextColor={'#747acc'}  //设置占位符颜色
              placeholder={'手机号'}  //设置占位符
              selectionColor={'#CC3BC2'}
              onChangeText={this._onChangePhone}
            />
          </View>
          <View
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              placeholderTextColor={'#747acc'}
              placeholder={'密码'}
              selectionColor={'#CC3BC2'}
              onChangeText={this._onChangePassword}
            />
          </View>
          <View>
            <Text style={styles.error}>{errors}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}>
            <Text
              style={styles.btText}
              onPress={()=>{this.Login()}}
            >登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              onRegisterPress();
            }}
          >
            <Text
              style={styles.btText}>注册</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}>
            <Text
              style={styles.btText}>忘记密码</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  button: {
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#b0d1d7',
    marginTop: 20,
  },
  btText: {
    color: '#fff',
    fontSize: 15,
  },
  error: {
    height: 30,
    color: 'red',
    fontSize: 15,
  }
});