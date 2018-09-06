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
    this.setState({msg: e.nativeEvent.data});
    alert(this.state.msg)
  }
  render() {
    return (
      <WebView
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