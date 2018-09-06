import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Image,
  Text,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Header from '../components/Header';
import LocalStorage from '../utils/LocalStorage';

import Register from '../components/Register';
import Login from '../components/Login';
import UserIndex from "../components/UserIndex";
import SignUp from "../components/SignUp";

const {width, height} = Dimensions.get('window');
const url='https://changjinglu.pro/signup?back=app&app=1'

export default class User extends Component {
  state = {
    states: 0,
    data: null,
  }

  /**
   * 读取本地存储
   */
  read(){
    AsyncStorage.getItem('object',(error,result)=>{
      if (!result) {
        this.setState({
          state: 1,
          data: JSON.parse(result),
        })
      }
    })
  }

  render() {
    var {states, data } = this.state;
    var title = states === 0 ? '登录' : states === 1 ? '我的长颈鹿' :  '我的长颈鹿';
    this.read();
    return (
      <View style={styles.root}>
        <Header titles={[title]} showSearch={false}/>
        {
          states === 0 ?
            <Login
              navigation={this.props.navigation}
              onLoginPress={(data) => {
                this.setState({
                  states: 1,
                  data: data,
                });
              }}
            />
            :
            <UserIndex
              goback={() => {
                LocalStorage.Deletes();
                this.setState({states: 0});
              }}
              data={data}
            />

        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});