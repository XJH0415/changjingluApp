import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Platform,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import UserIndexs from './UserIndexs';
import API from '../lib/dataApi';
var CookieManager = null;
if(Platform.OS === "ios"){
  CookieManager = require("react-native-cookies");
}
// import CookieManager from "react-native-cookies";


export default class User extends Component {

  static contextTypes={
    userState: PropTypes.string,
    setContextState: PropTypes.func,
  }

  state = {
    width: 0,
    height: 0,
    isLogin: false,
    info:null,
    cookiePsd:null,//cookie
    LoginKey: this.props.key,
  }

  patchPostMessageFunction = function () {
    function awaitPostMessage() {
      var isReactNativePostMessageReady = !!window.originalPostMessage;
      var queue = [];
      var currentPostMessageFn = function store(message) {
        if (queue.length > 100) queue.shift();
        queue.push(message);
      };
      if (!isReactNativePostMessageReady) {
        var originalPostMessage = window.postMessage;
        Object.defineProperty(window, 'postMessage', {
          configurable: true,
          enumerable: true,
          get: function () {
            return currentPostMessageFn;
          },
          set: function (fn) {
            currentPostMessageFn = fn;
            isReactNativePostMessageReady = true;
            setTimeout(sendQueue, 0);
          }
        });
        window.postMessage.toString = function () {
          return String(originalPostMessage);
        };
      }

      function sendQueue() {
        while (queue.length > 0) window.postMessage(queue.shift());
      }
    };

    awaitPostMessage();
    if (window.location['href'] == 'https://changjinglu.pro/app/me' ) {
      var info = document.getElementById('info').innerHTML;
      var da = {
        infos: JSON.parse(info),
        cookie: document.cookie,
      }
      window.postMessage(JSON.stringify(da));
      return;
    }


    setInterval(()=>{
      var Element = document.getElementById('info')
      if(!!Element){
        window.postMessage(Element.innerHTML);
        return;
      }
    },1000)



  };

  iospatchPostMessageFunction = function () {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function (message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function () {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;
    if (window.location['href'] == 'https://changjinglu.pro/app/me') {
      var info = document.getElementById('info').innerHTML;
      Cookies = document.cookie;
      var da = {
        infos: JSON.parse(info),
        cookie: document.cookie,
      }
      window.postMessage(JSON.stringify(da));
    }
    setInterval(()=>{
      var Element = document.getElementById('info')
      if(!!Element){
        window.postMessage(Element.innerHTML);
      }
    },1000)
  }
  patchPostMessageJsCode = Platform.OS === 'android' ? '(' + String(this.patchPostMessageFunction) + ')();' : '(' + String(this.iospatchPostMessageFunction) + ')();';

  componentDidMount() {
    let that = this;
    API.getMsg('userMsg',(info)=>{
      if (info){
        that.setState({
          info: info,
          isLogin: true,
        })
      }
    })
  }

  render() {
    var navigation=this.props.navigation;
    var {width, height, isLogin, info} = this.state;
    return (
      <View style={styles.root}>
        <Header titles={['我的长颈鹿']} showSearch={false}/>
        {
          isLogin ?
            <UserIndexs
              data={info}
              goback={()=>{
                API.logOut(()=>{});
                API.removeMsg('userMsg',()=>{});
                API.removeMsg('Cookie',()=>{});
                API.removeMsg('userState',()=>{});
                API.removeMsg('userKYCState',()=>{});
                this.context.setContextState({userState: '0', userKYCState: '0'})
                API.SaveMsg('userState','0');
                API.SaveMsg('userKYCState','0');
                this.setState({isLogin:false});
              }}
              navigation={navigation}
            />
            :
            <View style={styles.root} onLayout={(event) => {
              let {x, y, width, height} = event.nativeEvent.layout;
              this.setState({
                width: width,
                height: height
              })
            }}>
              {width && height ?
                <WebView
                  ref={ref => {
                    this.webview = ref;
                  }}
                  style={styles.root}
                  source={{uri: 'https://changjinglu.pro/signin?back=app&app=1'}}
                  scalesPageToFit={true}
                  injectedJavaScript={this.renderView(width, height)}
                  scrollEnabled={false}
                  javaScriptEnabled={true}
                  onNavigationStateChange={(e)=>{
                    var url = e.url;
                    if(Platform.OS === "ios"){
                      CookieManager.get(url).then((res) => {

                        API.SaveMsg('Cookie',res);
                        // alert(res+ 'url')
                      });
                    }
                  }}
                  onMessage={(e) => {
                    if (e.nativeEvent.data) {
                      var das = JSON.parse(e.nativeEvent.data)
                      this.context.setContextState({userState: '1'})
                      API.SaveMsg('userMsg',das.infos);
                      // API.SaveMsg('points', e.nativeEvent.data.points)
                      API.SaveMsg('userState','1');
                      this.setState({
                        isLogin: true,
                        info: das.infos
                      });
                    }
                  }}
                />
                : null
              }
            </View>
        }
      </View>
    );
  }

  renderView(width, height) {
    const heightPX = `${height || 400}px`;
    const widthPX = width ? `${width}px` : 'auto';
    return `
 ${this.patchPostMessageJsCode}
 document.getElementsByClassName('container')[0].style.height = "${heightPX}";
 document.getElementsByClassName('container')[0].style.width = "${widthPX}";
 document.getElementsByClassName('container')[0].style.backgroundColor = "white";`
  }


  createMeta() {
    return `
 var oMeta = document.createElement('meta');
 oMeta.setAttribute('name',"viewport");
 oMeta.setAttribute('content',"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");
 document.getElementsByTagName('head')[0].appendChild(oMeta);`
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
