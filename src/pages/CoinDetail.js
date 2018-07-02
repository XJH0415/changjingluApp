import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import NumUtils from '../utils/NumUtils';
import PairItem from '../components/PairItem';
import Separator from '../components/Separator';
import API from '../lib/dataApi';

export default class CoinDetail extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var coin = null;
    var headerTitle = '币详情';
    if (navigation) {
      coin = options.navigation.state.params.coin
      if (coin) {
        headerTitle = coin.code + '-' + (coin.name_cn ? coin.name_cn : '') + '(' + (coin.name_en ? coin.name_en : '') + ')'
      }
    }
    return {
      headerTitle: headerTitle
    }
  };
  static defaultProps = {
    coin: {
      coin_id: '1',
      url: '/b/bitcoin',
      icon: 'https://changjinglu.pro/uploads/image/996/76556ef0392f74257be6b42b13303ab2.png',
      code: 'BTC',
      name_en: 'Bitcoin',
      name_cn: '比特币',
      price: 42915.708802205,
      circulation: null,
      vol_24h: '2158432',
      gains_pct_1d: '2.6879'
    },

    currency: 'cny'
  }
  state={
    tickers:[],
    data:{},
    lines:[]
  }
  componentWillMount() {
    this.refresh();
  }
  refresh(){
    var {coin,currency,navigation}=this.props;
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    this.getTickers(coin.coin_id,currency);
    this.getBasic(coin.coin_id,currency);
    this.getKline(coin.coin_id,currency);
  }
  getTickers(coin_id,currency){
    var that=this;
    API.getCoinTicker(coin_id,currency,(body)=>{
      that.setState({
        tickers:body.data.tickers
      })
    })
  }
  getBasic(coin_id,currency){
    var that=this;
    API.getCoinBasic(coin_id,currency,(body)=>{
      that.setState({
        data:body.data
      })
    });
  }
  getKline(coin_id,currency){
    var that=this;
    API.getCoinKline(coin_id,currency,(body)=>{
      that.setState({
        lines:body.data[currency]
      })
    });
  }
  render() {
    var {coin, currency, navigation} = this.props;
    var {tickers,data,lines}=this.state;
    var {
      syb,//计价符号
      amount,//总发行量
      change_pct,//换手率
      circulation,//流通量
      gains_pct,//涨跌幅
      high,//24小时最高价
      low,//24小时最低价
      price,//价格
      value_pct,//流通市值占全球总值
      value_order,//流通市值全球排行
      vol,//24小时交易量
      vol_order,//24成交额排行
    }=data;
    var circulation_value=data['circulation_'+currency];//流通市值
    var vol_value=data['vol_'+currency];//24成交额
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    var source = {uri: coin ? coin.icon : ''}
    var color = '#DA7D7E';
    if (gains_pct && gains_pct*1 < 0) {
      color = '#3CB371';
    }
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.view, styles.detail]}>
          <View style={styles.detailTop}>
            <Image style={styles.image} source={source}/>
            <Text style={[styles.detailTopPrice, {color: color}]}>
              {syb?syb:''}{price ?price: '-'}
            </Text>
            <Text style={[styles.detailTopText, {color: color},]}>{currency.toUpperCase()}</Text>
            <Text style={[styles.detailTopText, {marginLeft: 5, color: color}]}>
              {gains_pct ? gains_pct : '-'}
            </Text>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.detailCenterText}>高:{high?high:''}</Text>
              <Text style={styles.detailCenterText}>低:{low?low:''}</Text>
            </View>
            <TouchableOpacity style={styles.detailTopBtn}>
              <Text>自选</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.detailCenterText}>
              量(24h): {vol ? vol : '-'},
              额(24h): {syb?syb:''}{vol_value ? vol_value : '-'}  (第{vol_order?vol_order:'-'}名)
              </Text>
            <Text style={styles.detailCenterText}>
              总发行量: {amount?amount:''},流通量: {circulation?circulation:''},流通市值: {syb?syb:''}{circulation_value},占全球总市值: {value_pct?value_pct+'%':'-'}  (第{value_order?value_order:'-'}名)
            </Text>
          </View>
          <View style={styles.detailBottom}>
            <View style={styles.detailChat}>
              
            </View>
            <View style={styles.detailBottomMore}>
              <TouchableOpacity>
                <Text style={styles.detailBottomText}>查看详情></Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <View style={[styles.view, styles.news]}>
          <View style={styles.newTop}>
            <Text style={styles.newTopTitle}>专栏资讯</Text>
          </View>
          <FlatList
            data={[1, 2]}
            ItemSeparatorComponent={() => <Separator/>}
            renderItem={() =>(
              <View style={styles.newItem}>
                <Text style={styles.newItemTitle} numberOfLines={1}>趋势恶化，6100-6200附近止损观望，空仓观望。比特月线支撑5000再行操作</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detailBottomText, {flex: 1, textAlign: 'left'}]}>2018-06-26 09:25</Text>
                  <Text style={styles.detailBottomText}>查看详情></Text>
                </View>
              </View>
            )}
          />
          <View style={styles.newShowMore}>
            <TouchableOpacity>
              <Text style={styles.newShowMoreText}>查看更多</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.view, styles.exchanges]}>
          <View style={styles.newTop}>
            <Text style={styles.newTopTitle}>行情</Text>
          </View>
          <FlatList
            data={tickers}
            ItemSeparatorComponent={() => <Separator/>}
            keyExtractor={(item) => item.coin_id}
            renderItem={({item, index}) => <PairItem ticker={item}/>}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  view: {
    backgroundColor: 'white',
    margin: 5,
    marginTop: 0,
    marginBottom: 10,
    padding: 5,
  },
  detail: {},
  detailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  },
  image: {
    height: 25,
    width: 25,
    marginRight: 5
  },
  detailTopPrice: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailTopText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold'
  },
  detailTopBtn: {
    backgroundColor: '#DA7D7E',
    borderRadius: 25,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  detailCenterText: {
    fontSize: 10,
    color: 'gray',
    marginBottom: 5
  },
  detailBottom: {
    height: 80,
  },
  detailChat: {
    flex: 1
  },
  detailBottomMore: {
    height: 16,
  },
  detailBottomText: {
    fontSize: 12,
    textAlign: 'right',
    color: 'gray',
    lineHeight: 16
  },
  news: {},
  newTop: {
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#E6E6FA',
    borderBottomWidth: 1
  },
  newTopTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#75C1AF'
  },
  newItem: {
    paddingLeft:5,
    paddingRight:5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  newItemTitle: {
    fontSize: 14,
    color:'black'
  },
  newShowMore: {
    height: 26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newShowMoreText: {
    fontSize: 14,
    color: 'gray'
  },
  exchanges: {}
});