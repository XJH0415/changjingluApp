import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';
import Header from '../components/Header';

export default class User extends Component {
  state = {
    width: 0,
    height: 0
  }
  
  render() {
    var {width, height} = this.state;
    return (
      <View style={styles.root}>
        <Header titles={['我的长颈鹿']} showSearch={false}/>
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
              source={{uri: 'https://changjinglu.pro/signin?back=%2f&app=1'}}
              scalesPageToFit={true}
              injectedJavaScript={this.renderView(width, height)}
              scrollEnabled={false}
              javaScriptEnabled={true}
              automaticallyAdjustContentInsets={false}
              bounces={false}
            />
            : null
          }
        </View>
      </View>
    );
  }
  
  renderView(width, height) {
    const heightPX = `${height || 400}px`;
    const widthPX = width ? `${width}px` : 'auto';
    return `
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