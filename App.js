/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {Image,StyleSheet} from 'react-native';


import BottomTabNavigator from './src/Index';
import coinDetailScreen from './src/pages/CoinDetail';
const titles=['首页','币说','交易平台','排行榜','个人中心']

const StackNavigator = createStackNavigator({
  Index: {
    screen: BottomTabNavigator,
    navigationOptions:(Options)=>{
      return{
        headerTitle:'',
        headerStyle:{
          height:0,
          borderBottomWidth:0,
        }
      }
    }
  },
  CoinDetail: {
    screen: coinDetailScreen,
  },
}, {
  headerMode:'float',
  headerTransitionPreset:'fade-in-place',

  cardStyle:{
    backgroundColor:'#F4FFFF'
  },
  navigationOptions:{
    //顶栏栏组件的样式
    headerBackTitle:null,
    headerBackImage:()=>(
      <Image style={styles.tabIcon} source={require('./src/resource/back.png')}/>
    ),
    headerStyle:{
      backgroundColor:'#171B35'
    },
    //顶栏标题文字样式
    headerTitleStyle:{
      color:'#75C1AF'
    }
  }

})
export default class App extends Component {
  render() {
    return (
        <StackNavigator/>
    );
  }
}
const styles=StyleSheet.create({
  tabIcon:{
    width:20,
    height:20,
    marginLeft:10
  }
})

