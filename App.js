/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {Image,StyleSheet,Alert,Platform,Linking,NetInfo} from 'react-native';
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';
import _updateConfig from './update.json';
const {appKey} = _updateConfig[Platform.OS];

import BottomTabNavigator from './src/Index';
import coinDetailScreen from './src/pages/CoinDetail';
import newDetailScreen from "./src/pages/NewDetail";
import siteDetailScreen from './src/pages/SiteDetail';
import commentScreen from "./src/pages/Comment";
import GuessRiseFall from "./src/pages/GuessRiseFall";
import MyNews from "./src/pages/MyNews";
import GuessRecord from "./src/pages/GuessRecord";
import IntegralRecord from "./src/pages/IntegralRecord";
import CollectionArticles from "./src/pages/CollectionArticles";
import ChangePassword from "./src/pages/ChangePassword";
import HistoryBets from "./src/pages/HistoryBets";
import User from "./src/pages/User";
import MyLike from "./src/pages/MyLike";

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
  NewDetail:{
    screen: newDetailScreen,
  },
  SiteDetail:{
    screen:siteDetailScreen,
  },
  Comment:{
    screen:commentScreen,
  },
  GuessRiseFall:{
    screen:GuessRiseFall,
  },
  MyNews:{
    screen: MyNews,
  },
  GuessRecord:{
    screen: GuessRecord,
  },
  IntegralRecord:{
    screen: IntegralRecord,
  },
  CollectionArticles:{
    screen: CollectionArticles,
  },
  ChangePassword:{
    screen: ChangePassword,
  },
  HistoryBets:{
    screen: HistoryBets,
  },
  Users:{
    screen: User,
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
  MyLike:{
    screen: MyLike,
  }
}, {
  headerMode:'screen',
  headerTransitionPreset:'fade-in-place',
  mode:'card',
  cardStyle:{
    backgroundColor:'#F4F4F4'
  },
  navigationOptions:{
    //顶栏栏组件的样式
    headerBackTitle:null,
    headerBackImage:()=>(
      <Image style={styles.tabIcon} source={require('./src/resource/back.png')}/>
    ),
    headerStyle:{
      backgroundColor:'#171B35',
      height:50
    },
    //顶栏标题文字样式
    headerTitleStyle:{
      fontSize:18,
      fontWeight:'bold',
      color:'white'
    }
  }

})
export default class App extends Component {
  componentWillMount(){
    if (isFirstTime) {
      if (markSuccess) {
        markSuccess();
      }
    } else if (isRolledBack) {
      Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
    }
  }

  doUpdate = info => {
    downloadUpdate(info).then(hash => {

      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {text: '是', onPress: ()=>{switchVersion(hash);}},
        {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}
        },
      ]);

    }).catch(err => {
      Alert.alert('提示', '更新出错:'+err);
    });
  };
  checkUpdate = (appKey) => {
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        if(Platform.OS==='android'){
          Alert.alert('提示', '您的应用程序已过期，长颈鹿资讯发布了全新的APP，快去下载体验吧！', [
            {text: '确定',
              onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}
            },
          ]);
        }
      } else if (info.upToDate) {

      } else {
        Alert.alert('提示', '检查到新的版本（'+info.name+'）\n'+ info.description, [
          {text: '更新', onPress: ()=>{this.doUpdate(info)}},
          {text: '下次再说',},
        ]);
      }
    }).catch(err => {
      if(Platform.OS==='android'){
        Alert.alert('提示', '更新失败：'+err);
      }
    });
  };
  componentDidMount(){
    NetInfo.addEventListener('change',function(reachability){
      if(!reachability){
        Alert.alert('提示','当前网络连接已断开，为确保应用程序正常使用，请确保网络连接通畅！')
      }
    });
    if(!__DEV__){
      this.checkUpdate(appKey);
    }
  }
  componentWillUnmount(){
    if (markSuccess) {
      markSuccess();
    }
  }
  render() {
    return (
      <StackNavigator/>
    );
  }

}
const styles=StyleSheet.create({
  tabIcon:{
    width:50,
    height:50,
    marginLeft: 0,
    paddingLeft: 0,
  }
})

