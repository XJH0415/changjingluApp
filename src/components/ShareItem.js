/**
 * 文章分享
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export  default class BetRulesItem extends Component {

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.row}>
          <TouchableOpacity style={{marginRight: 10,}}>
            <Image source={require('../resource/WeiChatShare.png')} style={styles.img}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../resource/QQShare.png')} style={styles.img}/>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
    marginRight: 30,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  img:{
    width: 30,
    height: 30,
  },
});