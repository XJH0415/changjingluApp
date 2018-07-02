/**
 * 分割线组件
 */
import React,{Component} from 'react';
import {View} from 'react-native'

export default class Separator extends Component{
  render(){
    return <View style={{height: 0, borderColor: '#E6E6FA',borderBottomWidth:1}}/>
  }
}