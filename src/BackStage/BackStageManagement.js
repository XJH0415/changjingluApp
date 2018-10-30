/**
 * 后台管理
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity, Image, Dimensions,
} from 'react-native';
import ReviewManagement from "./ReviewManagement";
import ArticleManagement from "./ArticleManagement";

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export  default class BackStageManagement extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '后台管理';
    return {
      headerTitle: headerTitle
    };
  };

  state = {

  }

  render() {
    var navigate = this.props.navigation.state.params.navigation;
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.total} onPress={() => {
          navigate('ArticleManagement', {})
        }}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>文章管理</Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.total} onPress={() => {
          navigate('ReviewManagement', {})
        }}>
          <View style={styles.totalImgTxt}>
            <Text style={styles.totalText}>评论管理</Text>
          </View>
          <View>
            <Image style={styles.totalArrow} source={require('../resource/Arrow.png')}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
  },
  total: {
    paddingLeft: 5,
    height: 40,
    width: deviceWidth,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  totalImgTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalImg: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: 10,
  },
  totalText: {
    fontSize: 16,
  },
  totalNum: {
    fontSize: 15,
  },
  totalArrow: {
    alignItems: 'flex-end',
    marginRight: 10,
    width: 20,
    height: 20,
  },
});