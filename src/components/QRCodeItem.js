/**
 * 二维码
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode'

export  default class QRCodeItem extends Component {

  state = {
    text: '../resource/CJLAndroid.apk',
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text: text})}
            value={this.state.text}
          />
          <QRCode
            value={this.state.text}
            size={200}
            bgColor='#000'//二维码颜色
            fgColor='white'//二维码背景颜色
          />
        </View>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  }
});