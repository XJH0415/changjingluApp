/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Image,StyleSheet,Text} from 'react-native';

import homeScreen from './pages/Home';
import newScreen from './pages/New';
import coinsScreen from './pages/Coins';
import userScreen from './pages/User';
import exchangeScreen from './pages/Exchange';

export default BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: homeScreen,
    navigationOptions: {
      tabBarLabel: ({focused})=>(
        <Text style={focused?styles.text:styles.textTouch}>首页</Text>
      ),
      tabBarIcon:({focused})=>(
        <Image  style={styles.tabIcon} source={focused?require('./resource/home(1).png'):require('./resource/home.png')} />
      )
    }
  },
  New: {
    screen: newScreen,
    navigationOptions: {
      tabBarLabel: ({focused})=>(
        <Text style={focused?styles.text:styles.textTouch}>币说</Text>
      ),
      tabBarIcon:({focused})=>(
        <Image  style={styles.tabIcon} source={focused?require('./resource/new(1).png'):require('./resource/new.png')} />
      )
    }
  },
  Exchange: {
    screen: exchangeScreen,
    navigationOptions: {
      tabBarLabel: ({focused})=>(
        <Text style={focused?styles.text:styles.textTouch}>交易平台</Text>
      ),
      tabBarIcon:({focused})=>(
        <Image  style={styles.tabIcon} source={focused?require('./resource/exchange(1).png'):require('./resource/exchange.png')} />
      )
    }
  },
  Coin: {
    screen: coinsScreen,
    navigationOptions: {
      tabBarLabel: ({focused})=>(
        <Text style={focused?styles.text:styles.textTouch}>COIN</Text>
      ),
      tabBarIcon:({focused})=>(
        <Image  style={styles.tabIcon} source={focused?require('./resource/rank(1).png'):require('./resource/rank.png')} />
      )
    }
  },
  User: {
    screen: userScreen,
    navigationOptions: {
      tabBarLabel:({focused})=>(
        <Text style={focused?styles.text:styles.textTouch}>个人中心</Text>
      ),
      tabBarIcon:({focused})=>(
        <Image  style={styles.tabIcon} source={focused?require('./resource/user(1).png'):require('./resource/user.png')} />
      )
    }
  }
}, {})

const styles=StyleSheet.create({
  tabIcon:{
    width:25,
    height:25,
    marginLeft:1
  },
  text:{
    fontSize:10,
    color:'#75C1AF',
    marginBottom:2,
    fontWeight:'bold',
    textAlign:'center'
  },
  textTouch:{
    fontSize:10,
    color:'#8a8a8a',
    marginBottom:2,
    textAlign:'center',
  }
})

