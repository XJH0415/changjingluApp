import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Platform
} from 'react-native';
import Header from '../components/Header';
import UserIndex from '../components/UserIndex';
import LocalStorage from '../utils/LocalStorage';

export default class User extends Component {
  state = {
    width: 0,
    height: 0,
    isLogin: false,
    info: null
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
    if (window.location['href'] == 'https://changjinglu.pro/signin') {
      var info = document.getElementById('info').innerHTML;
      window.postMessage(info);
    }
    
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
    
    if (window.location['href'] == 'https://changjinglu.pro/signin') {
      var info = document.getElementById('info').innerHTML;
      window.postMessage(info);
    }
  }
  patchPostMessageJsCode = Platform.OS === 'android' ? '(' + String(this.patchPostMessageFunction) + ')();' : '(' + String(this.iospatchPostMessageFunction) + ')();';
  
  render() {
    var {width, height, isLogin, info} = this.state;
    return (
      <View style={styles.root}>
        <Header titles={['我的长颈鹿']} showSearch={false}/>
        {
          isLogin ?
            <UserIndex
              data={info}
              goback={()=>{ this.setState({isLogin:false})}}
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
                  injectJavaScript={(e) => {
                    window.postMessage('111')
                  }}
                  scrollEnabled={false}
                  javaScriptEnabled={true}
                  onMessage={(e) => {
                    if (e.nativeEvent.data) {
                      this.setState({
                        isLogin: true,
                        info: JSON.parse(e.nativeEvent.data)
                        
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