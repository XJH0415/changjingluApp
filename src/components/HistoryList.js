/**
 * 当前猜涨跌期数
 * 当前登录用户的竞猜记录
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList, TouchableOpacity
} from 'react-native';

export default class HistoryList extends Component {

  render() {
    var historyBets = this.props.historyBets;
    var coin = this.props.coin;
    var betData = this.props.betData;
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
    var navigate = this.props.navigation;
    return (
      <View style={styles.historyView}>
        <Text style={styles.historyLast}>最近猜涨跌</Text>
        <FlatList
          keyExtractor={(item, index) => {}}
          data={historyBets.records}
          renderItem={({item, index}) => {
            if (item.name.indexOf(betData.seq) === -1 && index < 10) {
              return (
                <TouchableOpacity
                  style={[styles.historyBets, {backgroundColor: (index + 1) % 2 === 0 ? '#e2f3ef' : '#fff',}]}
                  onPress={() => {
                    navigate('HistoryBets', {coin: coin, betData: item, historyBets: historyBets})
                  }}
                >
                  <Text>{item.name}</Text>
                  <View style={{flex: 1, alignItems: 'center',}}>
                    <Text
                      style={{
                        color: item['bet_status.name'] === '已取消(无人下注)' ? '#888888' :
                          item.final_price - item.base_price > 0 ? 'rgb(228,36,38)' :
                            'rgb(65,158,40)',
                      }}
                    >
                      {item['bet_status.name'] === '已取消(无人下注)' ? '已取消(无人下注)' :
                        item.final_price - item.base_price > 0 ? '涨' :
                          '跌'}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }

          }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  historyBets: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 30,
  },
  historyView: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  historyLast: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
  },
});