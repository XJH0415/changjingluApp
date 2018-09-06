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
      data = navigation.state.params.data
      if (data) {
        headerTitle = data.title
      }
    }
    return {
      headerTitle: headerTitle
    };
  };


  static defaultProps = {
    data:
      {
        bet:
          {
            coin_bet_id: '3440',
            type: 'daily',
            coin_id: '1',
            name: '比特币猜涨跌第64期',
            seq: '64',
            base_price: '0',
            final_price: '0',
            final_details: null,
            total_bets: '119',
            bet_times: '6',
            up_times: '2',
            up_bets: '42',
            down_times: '4',
            down_bets: '77',
            start_time: '1536202800',
            freeze_time: '1536242400',
            freeze_details: null,
            end_time: '1536285600',
            bet_status: '1',
            status: '0',
            'bet_status.name': '下注中',
            url: '/bet/3440'
          },
        coin:
          {
            coin_id: '1',
            code: 'BTC',
            uri: 'bitcoin',
            name_en: 'Bitcoin',
            name_cn: '比特币',
            icon_id: '1',
            bind_currency_code: '',
            description: '比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。与大多数货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学的设计来确保货币流通各个环节安全性。P2P的去中心化特性与算法本身可以确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付。这同样确保了货币所有权与流通交易的匿名性。比特币与其他虚拟货币最大的不同，是其总数量非常有限，具有极强的稀缺性。该货币系统曾在4年内只有不超过1050万个，之后的总数量将被永久限制在2100万个。',
            whitepaper: 'http://www.bitcoin.org/bitcoin.pdf',
            publish_time: '1225468800',
            is_asset: '0',
            asset_platform: '',
            amount: '21000000',
            circulation: '17124875',
            circulation_value_usd: '114985079965',
            value_pct: '52.619003333208',
            value_order: '1',
            price_usd: '6714.5062352147',
            price_cny: '42519.610734497',
            price_bet: '6398.8631775828',
            enable_bet: '1',
            bet_config: '[\r\n  {"site_id":2,"pair":"BTC/QC"},\r\n  {"site_id":3,"pair":"BTC/USDT"}\r\n]',
            vol_24h: '2724031',
            vol_24h_value_usd: '18290526220',
            vol_24h_order: '1',
            change_24h: '0.59028371132536',
            history: '',
            block_sites: '[{"url":"http://blockchain.info/"},{"url":"https://blockexplorer.com/"},{"url":"https://btc.com/"}]',
            ico_info: null,
            last_update_time: '1536213841',
            gains_pct_5m: '0.00000000319693',
            gains_pct_1h: '0.00000000319693',
            gains_pct_1d: '-10.6825',
            gains_pct_7d: '-5.58886',
            high_24h: '6987.83279',
            low_24h: '6714.506235',
            comment_stars: '83',
            comment_times: '19',
            status: '0',
            'icon.small': 'https://changjinglu.pro/uploads/image/996/76556ef0392f74257be6b42b13303ab2.png',
            icon: [Object],
            url: '/b/bitcoin'
          }
      },

  }

  state = {
    msg: null,
    updateTime: null,
    text: '',
    states: 1,
  }

  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  countDown() {
    var {freeze_time} = this.props.data.bet;
    var times = Math.floor(freeze_time - new Date().getTime() / 1000);
    var timer = null;
    var that = this;
    timer = setInterval(function () {
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
      that.setState({
        updateTime: ut,
      })
      times--;
    }, 1000);
    if (times <= 0) {
      clearInterval(timer);
      this.setState({
        updateTime: '已关闭',
      })
    }
  }

  getApi(){
    API.getGuessRF('3440', (data) => {
      // alert(data)
      // this.setState({
      //   msg: data,
      // })
    })
  }

  componentDidMount() {
    this.countDown();
  }

  render() {
    const {name, base_price, total_bets, bet_times, up_times, up_bets, down_times, down_bets, start_time, freeze_time, end_time, status} = this.props.data.bet;
    const {code, name_cn,} = this.props.data.coin;
    var {updateTime, msg} = this.state;
    this.getApi();
    // alert(data)
    var bet_status = this.props.data.bet['bet_status.name'];
    var uri = this.props.data.coin['icon.small'];
    var up_betsWidth = (up_bets / total_bets) * 100;
    var down_betsWidth = (down_bets / total_bets) * 100;
    var up_timesWidth = (up_times / bet_times) * 100;
    var down_timesWidth = (down_times / bet_times) * 100;
    var newTime = Math.floor(freeze_time - new Date().getTime() / 1000);
    return (
      <View style={styles.root}>
        <View style={styles.title}>
          <Image style={styles.titleImage} source={{uri: uri}}/>
          <Text style={styles.coinName}>{name_cn} / {code}</Text>
        </View>
        <View style={styles.idState}>
          <Text style={styles.titleName}>{name}</Text>
          <Text style={styles.bet_status}>目前状态：{bet_status}</Text>
        </View>
        <View style={styles.times}>
          <Text>开始时间：{DateUtils.Formart(new Date(start_time * 1000), 'yyyy-MM-dd hh:mm:ss')}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>锁仓时间：{DateUtils.Formart(new Date(freeze_time * 1000), 'yyyy-MM-dd hh:mm:ss')} </Text>
            <Text> 剩余时间:{updateTime}</Text>
          </View>
          <Text>开盘时间：{DateUtils.Formart(new Date(end_time * 1000), 'yyyy-MM-dd hh:mm:ss')}</Text>
        </View>
        <View style={styles.allAward}>
          <Text style={styles.allText}>总奖池：{total_bets}</Text>
          <View style={styles.allAwardImg}>
            <View style={{width: up_betsWidth, backgroundColor: 'red', height: 15}}/>
            <View style={{width: down_betsWidth, backgroundColor: 'green', height: 15}}/>
          </View>
          <Text style={{color: 'red', marginLeft: 10,}}>涨{up_bets}CJL</Text>
          <Text> / </Text>
          <Text style={{color: 'green', marginLeft: 10,}}>跌{down_bets}CJL</Text>
        </View>
        <View style={styles.allAward}>
          <Text style={styles.allText}>竞猜次数：{bet_times}</Text>
          <View style={styles.allAwardImg}>
            <View style={{width: up_timesWidth, backgroundColor: 'red', height: 15}}/>
            <View style={{width: down_timesWidth, backgroundColor: 'green', height: 15}}/>
          </View>
          <Text style={{color: 'red', marginLeft: 10,}}>涨{up_times}</Text>
          <Text> / </Text>
          <Text style={{color: 'green', marginLeft: 10,}}>跌{down_times}</Text>
        </View>
        <View style={styles.myGuess}>
          <Text style={styles.title1}>我要竞猜</Text>
          <RadioGroup
            onSelect={(index, value) => this.onSelect(index, value)}
            size={18}
            color={'black'}
            activeColor={'red'}
            thickness={2}
            >
            <RadioButton value={'item1'}>
              <Text>猜涨</Text>
            </RadioButton>

            <RadioButton value={'item2'}>
              <Text>猜跌</Text>
            </RadioButton>

          </RadioGroup>
          <View style={styles.guessNum}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                underlineColorAndroid={'transparent'}
                secureTextEntry={true}
                placeholder={'请输入竞猜额'}
                placeholderTextColor={'#b1b1b1'}  //设置占位符颜色
              />
            </View>
            <Text style={styles.btn_gus}>竞猜</Text>
          </View>
          <Text>最低竞猜额为10个CJL,您有100个CJL</Text>
        </View>
        <View>
          <Text style={styles.title1}>我的竞猜记录</Text>
        </View>
        <View>
          <Text style={styles.title1}>最近竞猜</Text>

        </View>
        <View>
          <Text style={styles.title1}>最近猜涨跌</Text>
        </View>
        <View>
          <Text style={styles.title1}>基本规则</Text>
          <Text style={styles.rule}>每天上午11点开始可以下注，晚上10点锁盘，第二天上午10点公布结果。锁盘时的价格为猜涨跌的基准价，开奖时的价格为最终价，如果最终价高于基准价，则结果为涨，如果最终价低于基准价，则结果为跌
            如果在锁盘或者开奖时计算价格失败（如没有获取交易所信息），则该次猜涨跌取消，所有下注的CJL退回</Text>
          <Text style={styles.title1}>价格计算</Text>
          <Text style={styles.rule}>不同于币的总体平均价，猜涨跌只选取了主流交易所的几个基准交易对，并在计算的时候以交易量为线性权重计算加权平均值</Text>
          <Text style={styles.title1}>赔率定义</Text>
          <Text style={styles.rule}>获胜的一方按照下注量均分所有人下注的CJL</Text>
        </View>
        <Text>{msg}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title1: {
    fontSize: 20,
    fontWeight: '300',
    marginTop: 5,
  },
  rule: {
    fontSize: 15,
    color: '#b1b1b1',
    marginBottom: 5,
  },
  titleImage: {
    width: 20,
    height: 20,
  },
  coinName: {
    fontWeight: '300',
  },
  idState: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: '400'
  },
  bet_status: {
    color: 'red',
  },
  times: {
    width: deviceWidth,
    justifyContent: 'space-between',
  },
  allAward: {
    flexDirection: 'row',
  },
  allText: {
    width: 120,
  },
  allAwardImg: {
    marginTop: 4,
    flexDirection: 'row',
    marginLeft: 10,
    width: 100,
    height: 12,
  },
  myGuess: {

  },
  guessNum: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:10,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    margin: 5,
    marginLeft:10,
  },

  txtInput: {
    width: 280,
    height: 30,
    fontSize: 16,
    margin: 0,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000000',
  },
  btn_gus: {
    width: 60,
    height: 40,
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: 'blue',
    color: '#ffffff',
    fontSize: 16,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: '#ffffff',
  },
})