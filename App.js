/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {Image, StyleSheet, Alert, Platform, Linking, NetInfo} from 'react-native';
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
import PropTypes from 'prop-types';

import _updateConfig from './update.json';

const {appKey} = _updateConfig[Platform.OS];

import BottomTabNavigator from './src/Index';
import coinDetailScreen from './src/pages/CoinDetail';
import newDetailScreen from "./src/pages/NewDetail";
import siteDetailScreen from './src/pages/SiteDetail';
import commentScreen from "./src/pages/Comment";
import User from "./src/pages/User";
import GuessRiseFall from "./src/pages/GuessRiseFall";
import MyNews from "./src/pages/MyNews";
import GuessRecord from "./src/pages/GuessRecord";
import IntegralRecord from "./src/pages/IntegralRecord";
import CollectionArticles from "./src/pages/CollectionArticles";
import ChangePassword from "./src/pages/ChangePassword";
import HistoryBets from "./src/pages/HistoryBets";
import MyLike from "./src/pages/MyLike";
import API from "./src/lib/dataApi";
import KYCIdentification from "./src/pages/KYCIdentification";
import BackStageManagement from "./src/BackStage/BackStageManagement";
import ArticleManagement from "./src/BackStage/ArticleManagement";
import ReviewManagement from "./src/BackStage/ReviewManagement";

// var CookieManager = null;
// if (Platform.OS === "ios") {
//   CookieManager = require("react-native-cookies");
// }
import CookieManager from "react-native-cookies";


const StackNavigator = createStackNavigator({
  Index: {
    screen: BottomTabNavigator,
    navigationOptions: (Options) => {
      return {
        headerTitle: '',
        headerStyle: {
          height: 0,
          borderBottomWidth: 0,
        }
      }
    }
  },
  CoinDetail: {
    screen: coinDetailScreen,
  },
  NewDetail: {
    screen: newDetailScreen,
  },
  SiteDetail: {
    screen: siteDetailScreen,
  },
  Comment: {
    screen: commentScreen,
  },
  GuessRiseFall: {
    screen: GuessRiseFall,
  },
  MyNews: {
    screen: MyNews,
  },
  GuessRecord: {
    screen: GuessRecord,
  },
  IntegralRecord: {
    screen: IntegralRecord,
  },
  CollectionArticles: {
    screen: CollectionArticles,
  },
  ChangePassword: {
    screen: ChangePassword,
  },
  HistoryBets: {
    screen: HistoryBets,
  },
  Users: {
    screen: User,
    navigationOptions: (Options) => {
      return {
        headerTitle: '',
        headerStyle: {
          height: 0,
          borderBottomWidth: 0,
        }
      }
    }
  },
  MyLike: {
    screen: MyLike,
  },
  KYCIdentification: {
    screen: KYCIdentification
  },
  BackStageManagement: {
    screen: BackStageManagement
  },
  ArticleManagement: {
    screen: ArticleManagement
  },
  ReviewManagement: {
    screen: ReviewManagement
  },
}, {
  headerMode: 'screen',
  headerTransitionPreset: 'fade-in-place',
  mode: 'card',
  cardStyle: {
    backgroundColor: '#F4F4F4'
  },
  navigationOptions: {
    //顶栏栏组件的样式
    headerBackTitle: null,
    headerBackImage: () => (
      <Image style={styles.tabIcon} source={require('./src/resource/back.png')}/>
    ),
    headerStyle: {
      backgroundColor: '#171B35',
      height: 50
    },
    //顶栏标题文字样式
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
    }
  }

})
export default class App extends Component {

  static childContextTypes = {
    userState: PropTypes.string,
    userKYCState: PropTypes.string,
    userMsg: PropTypes.any,
    coins: PropTypes.array,
    selfCoins: PropTypes.array,
    selfCoinsString: PropTypes.any,
    myTicker: PropTypes.array,
    myTickerString: PropTypes.any,
    setContextState: PropTypes.func,
    getContextState: PropTypes.func,
  }

  state = {
    userState: '0',//用户是否登录 0 未登录 1登录
    userKYCState: '0',//用户是否KYC认证 0 未认证 1认证
    userMsg: null,//用户信息
    coins: [],//首页的50个热门币
    selfCoins: [],//自选币
    selfCoinsString: {},//自选币 //{coin_id: msg, coin_id2: msg2}
    myTicker: [],//自选交易对
    myTickerString: {},//自选交易对 //{code_site_id: msg, code_site_id: msg2}
    cookieState: '0',
    getContextState: () => {
      return this.state
    },
    setContextState: (state) => {
      if (state.setContextState) {
        delete state['setContextState'];
      }
      this.setState(state)
    }
  }

  getChildContext() {
    return {
      userState: this.state.userState,
      userKYCState: this.state.userKYCState,
      userMsg: this.state.userMsg,
      coins: this.state.coins,
      selfCoins: this.state.selfCoins,
      selfCoinsString: this.state.selfCoinsString,
      myTicker: this.state.myTicker,
      myTickerString: this.state.myTickerString,
      getContextState: this.state.getContextState.bind(this),
      setContextState: this.state.setContextState.bind(this),
    }
  }

  refresh() {
    this,this.getLocalCookie();
    this.getUserMsg();
    this.getUserState();
    this.getUserKYCState();
    this.getCoin();
    this.getSelfCoin();
    this.getMeTickers();
    this.TimeInit();
  }

  TimeInit() {
    var that = this;
    function init() {
      that.getLocalCookie();
      that.getUserMsg();
      that.getUserState();
      // that.getUserKYCState();
      that.getCoin();
      that.getSelfCoin();
      that.getMeTickers();

    }

    that.Interval = setInterval(() => {
      init();
    }, 5000)
  }

//获取用户状态
  getUserState() {
    let that = this;
    API.getMsg('userState', (userState) => {
      if (userState) {
        that.setState({
          userState: userState
        });
      }
    });
  }

  //获取用户KYC状态
  getUserKYCState() {
    let that = this;
    API.getMsg('userKYCState', (userKYCState) => {
      if (userKYCState) {
        that.setState({
          userKYCState: userKYCState
        });
      }
    });
  }

//获取用户最新信息
  getUserMsg() {
    let that = this;
    API.getMsg('userMsg', (userMsg) => {
      if (userMsg) {
        that.setState({
          userMsg: userMsg
        });
      }
    });
    API.getLogMe((userMsg) => {
      if (userMsg) {
        that.setState({
          userMsg: userMsg
        })
      }
    })
  }

  getCoin() {
    let that = this;
    API.getCoins(1, 'va', 'cny', (data) => {
      if (data) {
        that.setState({
          coins: data.coins,
        })
      }
    })
  }

  //获取用户自选币
  getSelfCoin() {
    let that = this;
    var mySelf = {};
    API.getSelfSelect('1', 'va', (selfCoins) => {
      if (selfCoins) {
        that.setState({
          selfCoins: selfCoins.coins.records,
        })
        if (selfCoins.coins.records.length > 0) {
          for (let self of selfCoins.coins.records) {
            mySelf[self.coin_id] = self;
          }
          that.setState({
            selfCoinsString: mySelf,//{code: msg,code2: msg2}
          })
        }
      }
    })
  }

  //获取用户自选交易对
  getMeTickers() {
    let that = this;
    var myTic = {};
    API.getMeTickers('', '', (myTicker) => {
      if (myTicker.length > 0) {
        that.setState({
          myTicker: myTicker,
        })
        for (let tic of myTicker) {
          myTic[tic.code + '_' + tic.site_id] = tic;
        }
        that.setState({
          myTickerString: myTic,
        })
      }
    })
  }

  getLocalCookie(){
    let that = this;
    if (that.state.cookieState === '1') {
      API.getMsg("Cookie", (res) => {
        // alert(JSON.stringify(res))
        if (res !== {} && res['PHPSESSID']) {
          CookieManager.set({
            name: 'PHPSESSID',
            value: res['PHPSESSID'],
            domain: 'changjinglu.pro',
            path: '/',
            origin: 'https://changjinglu.pro/',
            version: '1',
            expiration: '2099-11-06T02:00:26.000Z'
          }).then((re) => {
            that.setState({
              cookieState: '1'
            })
          });
        }
      })
    }
  }

  componentWillMount() {
    this.refresh();
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
        {
          text: '是', onPress: () => {
            switchVersion(hash);
          }
        },
        {
          text: '下次启动时', onPress: () => {
            switchVersionLater(hash);
          }
        },
      ]);

    }).catch(err => {
      Alert.alert('提示', '更新出错:' + err);
    });
  };
  checkUpdate = (appKey) => {
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        if (Platform.OS === 'android') {
          Alert.alert('提示', '长颈鹿资讯发布了全新的APP，快去下载体验吧！', [
            {
              text: '确定',
              onPress: () => {
                info.downloadUrl && Linking.openURL(info.downloadUrl)
              }
            },
          ]);
        }
      } else if (info.upToDate) {

      } else {
        Alert.alert('提示', '检查到新的版本（' + info.name + '）\n' + info.description, [
          {
            text: '更新', onPress: () => {
              this.doUpdate(info)
            }
          },
          {text: '下次再说',},
        ]);
      }
    }).catch(err => {
      if (Platform.OS === 'android') {
        Alert.alert('提示', '更新失败：' + err);
      }
    });
  };

  componentDidMount() {
    this.getLocalCookie();
    NetInfo.addEventListener('change', function (reachability) {
      if (!reachability) {
        Alert.alert('提示', '当前网络连接已断开，为确保应用程序正常使用，请确保网络连接通畅！')
      }
    });
    if (!__DEV__) {
      this.checkUpdate(appKey);
    }
  }

  componentWillUnmount() {
    if (markSuccess) {
      markSuccess();
    }
    clearInterval(this.Interval);
  }

  render() {
    return (
      <StackNavigator/>
    );
  }

}

const styles = StyleSheet.create({
  tabIcon: {
    width: 50,
    height: 50,
    marginLeft: 0,
    paddingLeft: 0,
  }
})
