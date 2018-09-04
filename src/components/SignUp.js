import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  WebView,
} from 'react-native';

export default class SignUp extends Component {
  static defaultProps ={
    goback :()=>{},
  }

  render() {
    var {goback,  } =this.props;
    return (
      <View>
        <Text onPress={()=>{goback()}} style={styles.goBack}>返回登录</Text>
        <WebView
          source={{uri: 'https://changjinglu.pro/signup?back=%2F'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={false}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  goBack: {
    width:80,
    color: 'blue',
    fontSize: 15,
    textDecorationLine:'underline',
  },
})