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
export default class SignUp extends Component {
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

  static defaultProps ={
    goback :()=>{},
  }

  render() {
    var {goback,  } =this.props;
    return (
      <View>
        <Text>注册</Text>
        <WebView
          source={{uri: url}}
          style={{flex: 1}}
          bounces={false}
          scalesPageToFit={false}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
        />
      </View>

    )
  }
}


const styles = StyleSheet.create({

})