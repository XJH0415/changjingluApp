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

const {width, height} = Dimensions.get('window');

export default class User extends Component {
  state = {
    states: 0,
    data: null,
    object: 0
  }

  /**
   * 读取本地存储
   */
  read(){
    AsyncStorage.getItem('object',(error,result)=>{
      if (result !== null) {
        this.setState({
          object: 1,
          data: JSON.parse(result),
        })
      }else{
        this.setState({
          object: 0,
        })
      }
    })
  }

  render() {
    var {states, data, object} = this.state;
    var title = states === 0 ? '登录' : states === 1 ? '我的长颈鹿' : states === 2 ? '注册' : '我的长颈鹿';
    this.read();
    return (
      <View style={styles.root}>
        <Header titles={[title]} showSearch={false}/>
        {
          states === 1 || object === 1 ?
            <UserIndex goback={() => {
              this.setState({states: 0, object : 0});
              LocalStorage.Deletes();
            }}
            data={data}
            />
            :
            states === 2 ?
              <Register goback={() => {
                this.setState({states: 0,})
              }}
              onPressGoLogin={() => {
                this.setState({states: 0,})
              }}
              />
              :
              <Login
                onRegisterPress={() => {
                  this.setState({states: 2,})
                }}
                onLoginPress={(data) => {
                  this.setState({
                    states: 1,
                    data: data,
                  });
                }}

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