import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert
} from 'react-native';

import API from '../lib/dataApi';

/**
 * 验证手机号码
 *
 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
 * 联通号码段:130、131、132、136、185、186、145
 * 电信号码段:133、153、180、189
 *
 * @param phone
 * @return
 */
function checkPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  }
}
export default class Register extends Component {

  static defaultProps ={
    goback :()=>{},
    onPressGoLogin: ()=>{}
  }

  state={
    phone:null,//手机号
    userName:null,
    psd:null,
    repsd: null,
    recVerCode:null,//接收的验证码
    txtVerCode:null,//输入的验证码
    error:null,
    timeLeft: 60,
    begin: 0,
  };

  _phoneMsg = (phone) =>{
    checkPhone(phone) === false ? this.setState({error:'手机号输入错误'})
      : this.setState({phone : phone, error : null});
  };

  _userNameMsg = (userName) =>{
    userName.length > 10 || userName.length <= 3 ? this.setState({error:'用户名长度3-10'})
      : this.setState({ userName : userName, error : null });
  };

  _psdMsg = (psd) =>{
    psd.length > 20 || psd.length < 6 ? this.setState({error:'密码长度6-20'})
      : this.setState({ psd : psd, error : null });
  };

  _repsdMsg = (repsd) =>{
    var {psd } = this.state;
    repsd !== psd ? this.setState({error:'密码输入不一致'})
      : this.setState({ repsd : repsd, error : null });
  };

  _verCodeMsg = (txtVerCode) =>{
    this.setState({
      txtVerCode:txtVerCode
    });
  };

  onPressRegister() {
    var {onPressGoLogin } = this.props;
    var {phone, userName, psd, repsd, txtVerCode, recVerCode} = this.state;
    phone === null ? this.setState({error:'手机号不能为空'})
      : userName === null ? this.setState({error:'用户名不能为空'})
        : psd === null || repsd === null ? this.setState({error:'密码不能为空'})
          : psd !== repsd ? this.setState({error:'密码输入不一致'})
            : txtVerCode !== recVerCode ? this.setState({error:'验证码输入错误，请重新输入'})
              : txtVerCode === null ? this.setState({error:'验证码不能为空'})
                : API.getRegister(userName, phone, psd, txtVerCode, (data) => {
                    data === '手机号已经被注册' || data === '无效的手机号' ? this.setState({error:'手机号已经被注册或无效'})
                      : alert('注册成功'); onPressGoLogin();
                  })
  }

  render() {
    var {goback } =this.props;
    var {error } =this.state;
    return (
      <View style={styles.root}>
        <Text onPress={()=>{goback()}} style={styles.goBack}>返回登录</Text>
        <TouchableOpacity
          activeOpacity={1.0}  //设置背景被点击时，透明度不变
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
              onChangeText={this._phoneMsg}

            />
          </View>
          <View
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#747acc'}
              placeholder={'用户名'}
              selectionColor={'#CC3BC2'}
              onChangeText={this._userNameMsg}
            />
          </View>
          <View
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}  //设置为密码输入框
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#747acc'}
              placeholder={'密码'}
              selectionColor={'#CC3BC2'}
              onChangeText={this._psdMsg}
            />
          </View>
          <View
            style={styles.inputBox}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#747acc'}
              placeholder={'确认密码'}
              selectionColor={'#CC3BC2'}
              onChangeText={this._repsdMsg}
            />
          </View>
          <View style={styles.verTxt}>
            <TextInput
              style={styles.smsTxt}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#747acc'}
              placeholder={'验证码'}
              onChangeText={this._verCodeMsg}
            />
            <Text
              onPress={this._beginCountDown.bind(this)}
              style={styles.smsBtn}
            > { this.state.begin === 0 ? '点击获取验证码' : this.state.timeLeft } </Text>
          </View>
          <Text style={styles.errors}>{error }</Text>
          <TouchableOpacity
            style={styles.button}>
            <Text
              style={styles.btText} onPress={this.onPressRegister.bind(this)}>注册</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.afterEnd = this.props.afterEnd || this._afterEnd;
  }

  /**
   * 验证码
   * @private
   */
  _beginCountDown() {
    var {phone } =this.state;
    if (phone === undefined){
      this.setState({
        error:'手机号不能为空',
      });
      return ;
    }else{
      this.setState({
        error:'',
      });
      if (this.state.begin === 1){
        return;
      }
      var {timeLeft, begin } = this.state;
      var afterEnd = this.afterEnd;
      this.countdownfn(timeLeft, afterEnd, begin)

      // this.setState({
      //   recVerCode:123456
      // });

      API.getSms(phone, (data) =>{
        var da = {};
        da.phone = phone;
        this.setState({
          recVerCode:data
        });
        alert(data);
        callback(da);
      })
    }
  }
  countdownfn(timeLeft, callback, begin) {
    if (timeLeft > 0) {
      this.state.begin = 1;
      let that = this;
      let interval = setInterval(function () {
        if (that.state.timeLeft < 1) {
          clearInterval(interval);
          callback(that)
        } else {
          let totalTime = that.state.timeLeft;
          that.setState({
            timeLeft: totalTime - 1
          })
        }
      }, 1000)
    }
  }



  _afterEnd(that) {
    console.log('------------time over');
    that.setState({
      begin : 0,
      timeLeft : 60,
    })
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'#F5FCFF',
  },
  goBack: {
    width:80,
    color: 'blue',
    fontSize: 15,
    textDecorationLine:'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errors: {
    height: 30,
    fontSize: 20,
    color: 'red',
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
  verTxt: {
    flexDirection: 'row',
  },
  smsTxt: {
    width: 120,
    backgroundColor: '#ffffff',
    color: '#000FFF',
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
  smsBtn: {
    backgroundColor: '#ffffff',
    color: 'red',
    fontSize: 17,
    height: 40,
    width: 150,
    zIndex: 999,
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: 10,
    borderRadius: 8,
  },
  button: {
    height: 50,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ff0000',
    marginTop: 10,
  },
  btText: {
    color: '#ffffff',
    fontSize: 15,
  },
});