import React, {Component} from 'react';
import {
  TouchableWithoutFeedback, StyleSheet, Linking,
  Text,
  View,
  Dimensions,
  WebView,
} from 'react-native';
var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
const url='https://changjinglu.pro/signup?back=app&app=1';

export default class Register extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '注册';
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

  state = {
    msg: null
  }

  _onMessage(e){
    // this.setState({msg: e.nativeEvent.data});
    console.log( e.nativeEvent.data)
  }
  
  postMessage() {
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
    awaitPostMessage(); // Call this only once in your Web Code.
  
    window.postMessage(JSON.stringify({status: 'ready'}));
  }
  render() {
    // const patchPostMessageJsCode = '(' + String(postMessage) + ')();';
    return (
      <WebView
        // injectedJavaScript={''}
        source={{uri: url}}
        style={{flex: 1}}
        bounces={false}
        scalesPageToFit={false}
        scrollEnabled={false}
        automaticallyAdjustContentInsets={true}
        onMessage={(event)=>{this._onMessage(event)}}
      />

    )
  }

}

const styles = StyleSheet.create({

});