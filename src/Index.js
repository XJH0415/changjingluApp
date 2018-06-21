/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';

import homeScreen from './pages/Home';
import newScreen from './pages/New';
import rankScreen from './pages/Rank';
import userScreen from './pages/User';
import exchangeScreen from './pages/Exchange';

export default BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: homeScreen,
    navigationOptions: {
      tabBarLabel: '首页'
    }
  },
  New: {
    screen: newScreen,
    navigationOptions: {
      tabBarLabel: '币说'
    }
  },
  Exchange: {
    screen: exchangeScreen,
    navigationOptions: {
      tabBarLabel: '交易平台'
    }
  },
  Rank: {
    screen: rankScreen,
    navigationOptions: {
      tabBarLabel: '排行榜'
    }
  },
  User: {
    screen: userScreen,
    navigationOptions: {
      tabBarLabel: '个人中心'
    }
  }
}, {})

