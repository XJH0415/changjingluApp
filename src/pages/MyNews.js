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
export default class MyNews extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '我的消息';
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

  static defaultProps ={

  }

  render() {
    return (
      <View>
        <Text>消息</Text>

      </View>

    )
  }
}


const styles = StyleSheet.create({

})