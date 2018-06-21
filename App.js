/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';


import BottomTabNavigator from './src/Index';
import coinDetailScreen from './src/pages/CoinDetail';
const titles=['首页','币说','交易平台','排行榜','个人中心']

const StackNavigator = createStackNavigator({
  Index: {
    screen: BottomTabNavigator,
    navigationOptions:(Options)=>{
      return{
        headerTitle:titles[Options.navigation.state.index],
      }
    }
  },
  CoinDetail: {
    screen: coinDetailScreen,
  },
}, {})
export default class App extends Component {
  render() {
    return (
        <StackNavigator/>
    );
  }
}

