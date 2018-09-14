import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Platform
} from 'react-native';
import Header from '../components/Header';
import UserIndexs from './UserIndexs';
import LocalStorage from '../utils/LocalStorage';
import API from '../lib/dataApi';

export default class User extends Component {
  state = {
    width: 0,
    height: 0,
    // isLogin: true,
    // info: {"user_id":"6","name":"gdj","email":"","phone":"15990163420","add_time":"1524105373","add_ip":"112.17.72.166","last_access_time":"1536743251","last_access_ip":"112.17.242.51","avatar_id":"3144","description":"","points":"10166","ref_id":"0","status":"0","role":"admin","avatar":"https:\/\/changjinglu.pro\/uploads\/image\/f96\/e7592f30bf94af4b69005f6fe0371e47.jpg"}
    isLogin: false,
    info:null,
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
      window.postMessage(info);
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
      window.postMessage(info);
    }
    setInterval(()=>{
      var Element = document.getElementById('info')
      if(!!Element){
        window.postMessage(Element.innerHTML);
      }
    },1000)
  }
  patchPostMessageJsCode = Platform.OS === 'android' ? '(' + String(this.patchPostMessageFunction) + ')();' : '(' + String(this.iospatchPostMessageFunction) + ')();';

  componentDidMount(){
    let that = this;
    console.log(LocalStorage.Read())
    // that.setState({
    //   isLogin: true
    // })
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
                API.getLogOut((result)=>{
                  console.log(result)
                });
                LocalStorage.Deletes();
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
                  onMessage={(e) => {
                    if (e.nativeEvent.data) {
                      console.log(e.nativeEvent.data)
                      this.setState({
                        isLogin: true,
                        info: JSON.parse(e.nativeEvent.data)
                      });
                      LocalStorage.Save(JSON.parse(e.nativeEvent.data));
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