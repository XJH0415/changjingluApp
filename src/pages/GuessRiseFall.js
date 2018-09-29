import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  Picker,
  TouchableOpacity,
  TouchableWithoutFeedback, Alert,
} from 'react-native';
import DateUtils from '../utils/DateUtils';
import API from '../lib/dataApi';
import BetRulesItem from "../components/BetRulesItem";
import CurrentBetList from "../components/CurrentBetList";
import RegularData from '../utils/RegularData';
import SelectButtonItem from "../components/SelectButtonItem";
import MyBetsList from "../components/MyBetsList";
import HistoryList from "../components/HistoryList";

const GuessImg = RegularData.GuessImg;

export default class GuessRiseFall extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '猜涨跌';
    if (navigation) {
      data = navigation.state.params.betData
      if (data) {
        headerTitle = data.name
      }
    }
    return {
      headerTitle: headerTitle
    };
  };

  static defaultProps = {
    coin: null,
    betData: null,
  }

  state = {
    coin: this.props.navigation.state.params.coin,//币数据
    coin_id: null,//币coin_id
    betData: this.props.navigation.state.params.betData,//币猜涨跌数据
    updateTime: '',
    historyBets: null,
    CurrentData: null, //当前用户猜涨跌数据以及所有参与本次猜涨跌的记录
    userMsg: null,//用户在本地的部分数据
    userState: '0',
  }

  componentDidMount() {
    this.refresh();
  }

  refresh(){
    var {coin, betData} = this.state;
    var {start_time, freeze_time, end_time, bet_status} = betData;
    bet_status === '0' ? this.countDown(start_time) :
      bet_status === '1' ? this.countDown(freeze_time) :
        this.countDown(end_time);
    this.getUserState();
    this.getHistoryBets();
    this.getCurrentBets();
    this.getUserMsg();
  }

  AddBet(coin_bet_id, type, betNum){
    var {coin, betData} = this.state;
    let that = this;
    API.AddBet(coin_bet_id, type, betNum, (result) => {
      that.refresh();
      clearInterval(that.timer);
      that.getBetActive(coin.coin_id);
      Alert.alert('' + '竞猜成功,祝您旗开得胜!')
    }, (error) => {
      Alert.alert('' + '亲，数据出错了,再来一次吧')
    })
  }

  getUserMsg() {
    let that = this;
    API.getLogMe((userMsg) => {
      if (userMsg){
        that.setState({
          userMsg: userMsg
        })
      }
    })
  }

  getUserState() {
    let that = this;
    API.getMsg('userState', (userState) => {
      if (userState) {
        that.setState({
          userState: userState
        })
      }
    })
  }

  countDown(countTime) {
    var {coin, betData} = this.state;
    var times = Math.floor(countTime - new Date().getTime() / 1000);
    var that = this;
    that.timer = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (day <= 9) day = '0' + day;
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      var ut = hour + "小时" + minute + "分钟" + second + "秒";
      if (hour === '00') {
        ut = minute + "分钟" + second + "秒";
      }
      if (hour === '00' && minute === '00') {
        ut = second + "秒";
      }
      that.setState({
        updateTime: ut,
      })
      times--;
    }, 1000);
    if (times <= 0) {
      clearInterval(that.timer);
      this.setState({
        updateTime: '',
      })
      this.getBetActive(coin.coin_id);
    }
  }

  getBetActive(coin_id){
    var that=this;
    API.getBetActive((data)=>{
      if (data){
        for(var betData of data){
          if (coin_id === betData.coin_id) {
            that.setState({
              betData:betData
            });
            break;
          }
        }
      }
    })
  }

  getHistoryBets() {
    let that = this;
    var {coin} = this.props.navigation.state.params;
    API.getHistoryBets(coin.coin_id, (data) => {
      if (data) {
        that.setState({
          historyBets: data,
        })
      }
    })
  }

  getCurrentBets() {
    let that = this;
    var {betData} = this.props.navigation.state.params;
    API.getCurrentBets(betData.coin_bet_id, (CurrentData) => {
      if (CurrentData){
        that.setState({
          CurrentData: CurrentData,
        })
      }
    })
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {
    var {coin, betData, updateTime, historyBets, CurrentData, userState, userMsg} = this.state;
    var points = null;
    if (userMsg){
      points = userMsg.points;
    }
    var {navigate} = this.props.navigation;
    if (betData) {
      var {
        coin_bet_id,//猜涨跌id
        type,//类型
        coin_id,//币id
        name,//猜涨跌名称
        seq,//猜涨跌期数
        base_price,//锁定价格
        final_price,//最终价格
        total_bets,//总奖池/积分CJL
        bet_times,//猜的次数
        up_times,//猜涨的次数
        up_bets,//猜涨的积分
        down_times,//猜跌的次数
        down_bets,//猜跌的积分
        start_time,//开始时间
        freeze_time,//锁仓时间
        end_time,//开盘时间
        bet_status,//状态 0等待中 1下注中 2锁定中
        //'bet_status.name',//状态名称：等待中 下注中 锁仓中
      } = betData;
    }
    return (
      <ScrollView style={styles.root}>
        <View style={styles.rowView}>
          <View style={styles.posit}>
            <Text>目前状态</Text>
            <Text>{bet_status === '0' ? '等待中' : bet_status === '1' ? '下注中' : '锁仓中'}</Text>
          </View>
          <View style={styles.posit}>
            <Text>开始时间</Text>
            <Text>{DateUtils.Formart(new Date(start_time * 1000), 'yyyy-MM-dd hh:mm:ss')}</Text>
            <Text>{bet_status === '0' ? '还剩' + updateTime : bet_status === '1' ? '已开始' : ''}</Text>
          </View>
        </View>
        {
          bet_status === '3' ?
            <View style={styles.rowView}>
              <View style={styles.posit}>
                <Text>锁定价格</Text>
                <Text>${base_price}</Text>
              </View>
              <View style={styles.posit}>
                <Text>最终价格</Text>
                <Text>${final_price}</Text>
              </View>
            </View>
            :
            <View/>
        }
        <View style={styles.rowView}>
          <View style={styles.posit}>
            <Text>锁仓时间</Text>
            <Text>{DateUtils.Formart(new Date(freeze_time * 1000), 'yyyy-MM-dd hh:mm:ss')}</Text>
            <Text>{bet_status === '0' ? '等待中' : bet_status === '1' ? '还剩' + updateTime : '已锁盘'}</Text>
          </View>
          <View style={styles.posit}>
            <Text>开盘时间</Text>
            <Text>{DateUtils.Formart(new Date(end_time * 1000), 'yyyy-MM-dd hh:mm:ss')}</Text>
            <Text>{bet_status === '0' ? '等待中' : bet_status === '1' ? '' : '还剩' + updateTime}</Text>
          </View>
        </View>
        {
          bet_status !== '0' ?
            <View style={styles.rowView}>
              <View style={styles.posit}>
                <Text>总奖池：{total_bets} CJL</Text>
                <View style={styles.tolImg}>
                  <View style={{backgroundColor: 'rgb(253, 0, 63)', width: (up_bets / total_bets) * GuessImg}}/>
                  <View style={{backgroundColor: 'rgb(0, 180, 73)', width: (down_bets / total_bets) * GuessImg}}/>
                </View>
                <View style={styles.tolImg}>
                  <View style={{alignItems: 'flex-end', width: GuessImg / 2}}>
                    <Text style={{color: 'rgb(253, 0, 63)'}}>涨{up_bets}CJL</Text>
                  </View>
                  <Text>/</Text>
                  <Text style={{color: 'rgb(0, 180, 73)', width: GuessImg / 2}}>跌{down_bets}CJL</Text>
                </View>
              </View>
              <View style={styles.posit}>
                <Text>竞猜次数：{bet_times}</Text>
                <View style={styles.tolImg}>
                  <View style={{backgroundColor: 'rgb(253, 0, 63)', width: (up_times / bet_times) * GuessImg}}/>
                  <View style={{backgroundColor: 'rgb(0, 180, 73)', width: (down_times / bet_times) * GuessImg}}/>
                </View>
                <View style={styles.tolImg}>
                  <View style={{alignItems: 'flex-end', width: GuessImg / 2}}>
                    <Text style={{color: 'rgb(253, 0, 63)'}}>涨{up_times}次</Text>
                  </View>
                  <Text>/</Text>
                  <Text style={{color: 'rgb(0, 180, 73)', width: GuessImg / 2}}>跌{down_times}次</Text>
                </View>
              </View>
            </View>
            :
            <View/>
        }


        {
          bet_status === '0' ?
            <View></View>
            :
            bet_status === '1' ?
              <View style={styles.myBetsView}>
                {
                  userState === '1' ?
                    <View>
                      <SelectButtonItem
                        betData={betData}
                        points={points}
                        onSubBtn={(coin_bet_id, type, betNum)=>{this.AddBet(coin_bet_id, type, betNum)}}/>
                      <MyBetsList CurrentData={CurrentData}/>
                    </View>
                    :
                    <View
                      // onPress={() => {
                      // }}
                    >
                      <Text style={{fontSize: 16,}}>登录后您可以竞猜</Text>
                    </View>
                }

              </View>
              :
              bet_status === '2' ?
                <View style={styles.endBetsView}>
                  <Text>{bet_status === '2' ? '竞猜已锁定,等待开奖中,还剩' + updateTime : ''}</Text>
                </View>
                :

                bet_status === '3' ?
                  <View style={styles.results}>
                    <Text>最终结果：</Text>
                    <Text style={{color: final_price - base_price > 0 ? 'rgb(228,36,38)' : 'rgb(65,158,40)'}}>
                      {
                        final_price - base_price > 0 ? '涨' : '跌'
                      }
                    </Text>
                  </View>
                  :
                  bet_status === '6' ?
                    <View>
                      <Text>已取消(无人下注)</Text>
                    </View>
                    :
                    <View></View>
        }


        {
          bet_status !== '0' ?
            <View style={{backgroundColor: '#fff', flex: 1, marginTop: 10,}}>
              {
                CurrentData ?
                  <CurrentBetList CurrentData={CurrentData}/>
                  :
                  <View/>
              }
            </View>
            :
            <View/>
        }


        {
          historyBets ?
            <HistoryList historyBets={historyBets} betData={betData} coin={coin} navigation={navigate}/>
            :
            <Text> </Text>
        }


        <BetRulesItem/>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  posit: {
    flex: 1,
    alignItems: 'center',
  },
  tolImg: {
    height: 20,
    width: GuessImg,
    flexDirection: 'row',
  },

  myBetsView: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  endBetsView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})