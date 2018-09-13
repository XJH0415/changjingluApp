/**
 * 分割线组件
 */
import React,{Component} from 'react';
import {View} from 'react-native'

export default class Separator extends Component{
  static defaultProps ={
    style:{}
  }
  render(){
    return <View style={[{backgroundColor: '#E6E6FA',height:1},this.props.style]}/>
  }
}