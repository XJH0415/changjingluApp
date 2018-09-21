import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import API from '../lib/dataApi'
import DateUtils from "../utils/DateUtils";
import BetRulesItem from "../components/BetRulesItem";
import CurrentBetList from "../components/CurrentBetList";
import HistoryList from "../components/HistoryList";

const GuessImg = 150;

export default class RefreshList extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '猜涨跌历史';
    if (navigation) {
      data = navigation.state.params.betData
      if (data) {
        headerTitle = data.name;
      }
    }
    return {
      headerTitle: headerTitle
    };
  };


  componentDidMount() {
    var {coin, betData, historyBets} = this.props.navigation.state.params;
    this.setState({
      coin: coin,
      betData: betData,
      historyBets: historyBets,
    });
    this.getCurrentBets();
  }
  state={
    coin: null,
    betData: null,
    CurrentData: null,
    historyBets: null
  }

  getCurrentBets() {
    let that = this;
    var {betData} = this.props.navigation.state.params;
    API.getCurrentBets(betData.coin_bet_id, (CurrentData) => {
      that.setState({
        CurrentData: CurrentData,
      })
    })
  }
  render(){
    var {coin, betData, CurrentData, historyBets} =this.state;
    var {navigate} = this.props.navigation;
    if (betData){
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
    return(
      <ScrollView style={styles.root}>
        <View style={styles.rowView}>
          <View style={styles.posit}>
            <Text>目前状态</Text>
            <Text>{bet_status === '3' ? '已开奖' : '已取消(无人下注)'}</Text>
          </View>
          <View style={styles.posit}>
            <Text>最终结果</Text>
            <Text style={{color: bet_status === '3' ? final_price-base_price > 0 ? 'rgb(228,36,38)' : 'rgb(65,158,40)' : '#888888'}}>
              {
                bet_status === '6' ? '已取消(无人下注)'
                  :
                  bet_status === '3' ? final_price- base_price > 0 ? '涨' : '跌'
                  :
                  '已取消(无人下注)'
              }</Text>
          </View>
        </View>
        <View style={styles.rowView}>
          <View style={styles.posit}>
            <Text>锁定价格</Text>
            <Text style={styles.bolds}>${base_price}</Text>
          </View>
          <View style={styles.posit}>
            <Text>最终价格</Text>
            <Text style={styles.bolds}>${final_price}</Text>
          </View>
        </View>
        <View style={styles.rowView}>
          <View style={styles.posit}>
            <Text>开始时间</Text>
            <Text>{DateUtils.Formart(new Date(start_time * 1000), 'yyyy-MM-dd hh:mm')}</Text>
          </View>
          <View style={styles.posit}>
            <Text>锁仓时间</Text>
            <Text>{DateUtils.Formart(new Date(freeze_time * 1000), 'yyyy-MM-dd hh:mm')}</Text>
          </View>
          <View style={styles.posit}>
            <Text>开盘时间</Text>
            <Text>{DateUtils.Formart(new Date(end_time * 1000), 'yyyy-MM-dd hh:mm')}</Text>
          </View>
        </View>
        <View style={styles.rowView}>
          <View style={styles.posit}>
            <Text>总奖池：{total_bets} CJL</Text>
            <View style={styles.tolImg}>
              <View style={{backgroundColor: 'rgb(253, 0, 63)',width: (up_bets/total_bets)*GuessImg}}/>
              <View style={{backgroundColor: 'rgb(0, 180, 73)',width: (down_bets/total_bets)*GuessImg}}/>
            </View>
            <View style={styles.tolImg}>
              <View style={{alignItems: 'flex-end',width: GuessImg/2 }}>
                <Text style={{color: 'rgb(253, 0, 63)'}}>涨{up_bets}CJL</Text>
              </View>
              <Text >/</Text>
              <Text style={{color: 'rgb(0, 180, 73)',width: GuessImg/2}}>跌{down_bets}CJL</Text>
            </View>
          </View>
          <View style={styles.posit}>
            <Text>竞猜次数：{bet_times}</Text>
            <View style={styles.tolImg}>
              <View style={{backgroundColor: 'rgb(253, 0, 63)',width: (up_times/bet_times)*GuessImg}}/>
              <View style={{backgroundColor: 'rgb(0, 180, 73)',width: (down_times/bet_times)*GuessImg}}/>
            </View>
            <View style={styles.tolImg}>
              <View style={{alignItems: 'flex-end', width: GuessImg/2}} >
                <Text style={{color: 'rgb(253, 0, 63)'}}>涨{up_times}次</Text>
              </View>
              <Text >/</Text>
              <Text style={{color: 'rgb(0, 180, 73)',width: GuessImg/2}}>跌{down_times}次</Text>
            </View>
          </View>
        </View>

        <CurrentBetList CurrentData={CurrentData}/>

        <BetRulesItem />
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  root:{
    flex: 1,
  },
  rowView:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  posit:{
    alignItems: 'center',
  },
  tolImg:{
    height: 20,
    width: GuessImg,
    flexDirection: 'row'
  },
  bolds:{
    fontWeight: 'bold'
  },

})