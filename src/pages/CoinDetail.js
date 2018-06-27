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
    currency: 'CNY'
  }

  render() {
    var {coin, currency, navigation} = this.props;
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    var source = {uri: coin ? coin.icon : ''}
    var color = '#DA7D7E';
    if (coin && coin.gains_pct_1d && coin.gains_pct_1d < 0) {
      color = '#3CB371';
    }
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.view, styles.detail]}>
          <View style={styles.detailTop}>
            <Image style={styles.image} source={source}/>
            <Text style={[styles.detailTopPrice, {color: color}]}>
              ￥{coin ? (coin.price * 1).toFixed(2) : '-'}
            </Text>
            <Text style={[styles.detailTopText, {color: color},]}>{currency.toUpperCase()}</Text>
            <Text style={[styles.detailTopText, {flex: 1, marginLeft: 5, color: color}]}>
              {coin ? (coin.gains_pct_1d * 1).toFixed(2) + '%' : '-'}
            </Text>
            <TouchableOpacity style={styles.detailTopBtn}>
              <Text>自选</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.detailCenterText}>
              量(24h) {coin.vol_24h ? NumUtils.formatNum(coin.vol_24h) : '-'}{coin.code},
              额(24h) {coin.vol_24h && coin.price ? NumUtils.formatNum(coin.vol_24h * coin.price) : '-'}
              {currency.toUpperCase()}</Text>
            <Text style={styles.detailCenterText}>
              总发行量{21000000},流通量{17041912},流通市值{NumUtils.formatNum(17041912 * (coin.price ? coin.price : 0))}
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
          <View>
            <View style={styles.newItem}>
              <Text style={styles.newItemTitle} numberOfLines={1}>维持昨日判断，今天下跌至6008，反弹6350附近继续下跌，反复震荡一周，选择方向</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={[styles.detailBottomText,{flex:1,textAlign:'left'}]}>2018-06-26 09:25</Text>
                <Text style={styles.detailBottomText}>查看详情></Text>
              </View>
            </View>
            <View style={styles.newItem}>
              <Text style={styles.newItemTitle} numberOfLines={1}>今日动向：6170-5925（今日）-6340（大概一周）-5500-4800</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={[styles.detailBottomText,{flex:1,textAlign:'left'}]}>2018-06-26 09:25</Text>
                <Text style={styles.detailBottomText}>查看详情></Text>
              </View>
            </View>
            <View style={styles.newItem}>
              <Text style={styles.newItemTitle} numberOfLines={1}>趋势恶化，6100-6200附近止损观望，空仓观望。比特月线支撑5000再行操作</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={[styles.detailBottomText,{flex:1,textAlign:'left'}]}>2018-06-26 09:25</Text>
                <Text style={styles.detailBottomText}>查看详情></Text>
              </View>
            </View>
            <View  style={styles.newShowMore}>
              <TouchableOpacity >
                <Text style={styles.newShowMoreText}>查看更多</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.view, styles.exchanges]}>
          <FlatList
            data={[1,2,3,4,5]}
            ItemSeparatorComponent={()=><Separator/>}
            renderItem={()=><PairItem/>}
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
    margin:5,
    marginTop: 0,
    marginBottom: 10,
    padding:5,
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
  news: {

  },
  newTop:{
    paddingTop:5,
    paddingBottom:5,
    borderColor:'#E6E6FA',
    borderBottomWidth:1
  },
  newTopTitle:{
    fontSize:14,
    fontWeight:'bold',
    color:'#75C1AF'
  },
  newItem:{
    paddingTop:2,
    paddingBottom:2,
    borderColor:'#E6E6FA',
    borderBottomWidth:1
  },
  newItemTitle:{
    fontSize:14,
  },
  newShowMore:{
    height:26,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  newShowMoreText:{
    fontSize:14,
    color:'gray'
  },
  exchanges: {}
});