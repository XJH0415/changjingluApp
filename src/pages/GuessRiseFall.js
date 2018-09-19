import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import DateUtils from '../utils/DateUtils';
import API from '../lib/dataApi';


const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

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
    coin: null,//币数据
    coin_id: null,//币coin_id
    betData: null,//币猜涨跌数据
    updateTime: '',
  }

  componentDidMount() {
    var {coin, betData} = this.props.navigation.state.params;
    this.setState({
      coin: coin,
      betData: betData,
    })
  }



  render() {
    var {coin, betData} = this.state;
    if (betData){
      var {
        coin_bet_id,//猜涨跌id
        type,//类型
        coin_id,//币id
        name,//猜涨跌名称
        seq,//猜涨跌期数
        total_bets,//总奖池/积分CJL
        bet_times,//猜的次数
        up_times,//猜涨的次数
        up_bets,//猜涨的积分
        down_times,//猜跌的次数
        down_bets,//猜跌的积分
        start_time,//开盘时间
        freeze_time,//开始时间
        end_time,//锁仓时间
        bet_status,//状态 0等待中 1下注中 2锁仓中
        //'bet_status.name',//状态名称：等待中 下注中 锁仓中
      } = betData;
    }
    return (
      <View style={styles.root}>
        <View style={styles.guessMsg}>
          <View style={styles.states}>
            <Text>目前状态</Text>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  guessMsg:{

  },
  states:{

  }
})