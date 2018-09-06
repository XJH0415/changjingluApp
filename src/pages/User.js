import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';
import Header from '../components/Header';
import UserIndex from '../components/UserIndex';
import LocalStorage from '../utils/LocalStorage';

export default class User extends Component {
  state = {
    width: 0,
    height: 0,
    isLogin:false,
    info:null
  }
  
  
  patchPostMessageFunction = function() {
    var originalPostMessage = window.postMessage;
    
    var patchedPostMessage = function(message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer);
    };
    
    patchedPostMessage.toString = function() {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    
    window.postMessage = patchedPostMessage;
    
    if(window.location['href']=='https://changjinglu.pro/signin'){
      var info = document.getElementById('info').innerHTML;
      window.postMessage(info);
    }
    
  };
  patchPostMessageJsCode = '(' + String(this.patchPostMessageFunction) + ')();';
  render() {
    var {width, height,isLogin,info} = this.state;
    return (
      <View style={styles.root}>
        <Header titles={['我的长颈鹿']} showSearch={false}/>
        {
          isLogin?
            <UserIndex data={info}/>
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
                  style={styles.root}
                  source={{uri: 'https://changjinglu.pro/signin?back=app&app=1'}}
                  scalesPageToFit={true}
                  injectedJavaScript={this.renderView(width, height)}
                  injectJavaScript={(e)=>{
                    window.postMessage('111')
                  }}
                  scrollEnabled={false}
                  javaScriptEnabled={true}
                  automaticallyAdjustContentInsets={false}
                  bounces={false}
                  onMessage={(e)=>{
                    if(e.nativeEvent.data){
                      this.setState({
                        isLogin:true,
                        info:JSON.parse(e.nativeEvent.data)
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
  
  
  createMeta(){
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