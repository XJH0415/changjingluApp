import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Platform
} from 'react-native';
import PairItem from '../components/PairItem';
import Separator from '../components/Separator';
import CoinLine from '../components/CoinLine';
import API from '../lib/dataApi';
import DateUtils from '../utils/DateUtils';
import RegularData from '../utils/RegularData';

const GuessImg = RegularData.GuessImg;

export default class CoinDetail extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var coin = null;
    var headerTitle = '币详情';
    if (navigation) {
      coin = options.navigation.state.params.coin
      if (coin) {
        headerTitle = coin.code?coin.code+'-' + (coin.name_cn ? coin.name_cn : coin.name_en):coin.name
      }
    }
    return {
      headerTitle: headerTitle
    }
  };
  static defaultProps = {
    coin: {
      coin_id: null,
      url: null,
      icon: null,
      code: null,
      name_en: null,
      name_cn: null,
      price: null,
      circulation: null,
      vol_24h: null,
      gains_pct_1d: null,
      type: null,
    },
    navigate:null,
    currency: 'cny',
    onNewPress:()=>{},
  }
  state = {
    tickers: [],
    data: {},
    lines: [],
    news: [],
    isRefreshing:false,
    betData: null,
    selfSelect: false,
    selfCoins: null,
    userState: '',
  }

  componentDidMount(){
    var {coin, navigation} = this.props;
    var {selfCoins} = this.state;
    this.getUserState();
    if (navigation) {
      // coin = navigation ? navigation.state.params.coin : null
      if (navigation.state.params.type === '1'){
        this.setState({
          selfSelect:true,
        })
      }else{
        this.setState({
          selfSelect:false,
        })
      }
    }else{
      this.getSelfSelect();
    }
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    var {coin, currency, navigation} = this.props;
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    this.getUserState();
    this.getTickers(coin.coin_id, currency);
    this.getBasic(coin.coin_id, currency);
    this.getKline(coin.coin_id, currency);
    this.getCoinArticles(coin.coin_id);
    this.getBetActive(coin.coin_id);
  }

  getUserState(){
    API.getMsg('userState', (userState)=>{
      if (userState){
        this.setState({
          userState: userState
        });
      }
      if (!this.props.navigation) {
        this.getSelfSelect();
      }
    });
  }
  getSelfSelect(){
    let that = this;
    if (this.state.userState === '1'){
      API.getSelfSelect('1', 'va', (selfCoins)=>{
        if (selfCoins){
          that.setState({
            selfCoins:selfCoins.coins.records,
          });
          for(let sc of selfCoins.coins.records){
            if (sc.coin_id === this.props.coin.coin_id){
              this.setState({
                selfSelect: true,
              });
              break;
            } else{
              this.setState({
                selfSelect: false,
              });
            }
          }
        }
      })
    }
  }

  getTickers(coin_id, currency) {
    var that = this;
    API.getCoinTicker(coin_id, currency, (data) => {
      if (data){
        that.setState({
          tickers: data.tickers
        })
      }
    })
  }
  getBasic(coin_id, currency) {
    var that = this;
    API.getCoinBasic(coin_id, currency, (data) => {
      if (data){
        that.setState({
          data: data
        })
      }
    });
  }
  getKline(coin_id, currency) {
    var that = this;
    API.getCoinKline(coin_id, currency, (data) => {
      that.setState({
        lines: data[currency]
      })
    });
  }
  getCoinArticles(coin_id){
    var that=this;
    API.getCoinArticles(coin_id,1,(data)=>{
      that.setState({
        news:data.article
      })
    })
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

  _onRefresh() {
    var that = this;
    that.setState({isRefreshing: true});
    that.refresh();
    setTimeout(() => {
      that.setState({
        isRefreshing: false
      })
    }, 5000);
  }

  //千分位逗号隔开
  fNum(s) {
    var n=3;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for(var i = 0; i < l.length; i ++ )
    {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("");
  }

  _CoinWatch(){
    var {coin, navigation} = this.props;
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    var {selfSelect, userState} = this.state;
    this.getUserState();
    let that = this;
    if (userState === '0' || userState === ''){
      return Alert.alert('', '亲，请先登录')
    }
    if (userState === '1'){
      if (selfSelect === true){
        API.RemoveCoinWatch(coin.coin_id, (result)=>{
          if (result){
            that.setState({
              selfSelect: false,
            })
          }
        })
      }else if(selfSelect === false){
        API.AddCoinWatch(coin.coin_id, (result)=>{
          if (result){
            that.setState({
              selfSelect: true,
            })
          }
        })
      }
    }
  }
  _SeeDetailBtn(){
    var {coin, navigation} = this.props;
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    API.getCoinDetails(coin.coin_id, (result)=>{
      if (result){
        // alert(JSON.stringify(result))//description
        Alert.alert('', result.description)
      }
    })
  }
  render() {
    var {coin, currency, navigation,onNewPress,navigate,} = this.props;
    var {tickers, data, lines, news, betData, selfSelect, userState} = this.state;
    if (!navigate){
      navigate = navigation.navigate;
    }
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
    } = data;
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
    var circulation_value = data['circulation_' + currency];//流通市值
    var vol_value = data['vol_' + currency];//24成交额
    if (navigation) {
      coin = navigation ? navigation.state.params.coin : null
    }
    var source = {uri: coin.icon ? coin.icon : coin.icon_small}
    var color = '#DA7D7E';
    if (gains_pct && gains_pct.indexOf('-')!==-1) {
      color = '#3CB371';
    }
    return (
      <ScrollView
        style={styles.root}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
          />}
      >
        <View style={[styles.view, styles.detail]}>
          <View style={styles.detailTop}>
            <Image style={styles.image} source={source}/>
            <Text style={[styles.detailTopPrice, {color: color}]}>
              {syb ? syb : ''}{price ? price : '-'}
            </Text>
            <Text style={[styles.detailTopText, {color: color},]}>{currency.toUpperCase()}</Text>
            <Text style={[styles.detailTopText, {marginLeft: 5, color: color}]}>
              {gains_pct ? gains_pct : '-'}
            </Text>
            <View style={{flex: 1,flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity  onPress={()=>{this._CoinWatch()}}>
                <View style={{height: 50, justifyContent: 'center', alignItems: 'center', marginRight: 5}}>
                  <Text style={styles.detailTopBtn}>{ selfSelect ? '取消自选' :selfSelect === '' ? '-' :  !selfSelect ? '加入自选' : '取消自选'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=>{
                if(navigation){
                  navigation.navigate('Comment', {data: coin, type: 'coin'})
                }else {
                  navigate('Comment', {data: coin, type: 'coin'})
                }
              }}>
                <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.detailTopBtn}>点评</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.detailCenterText}>高(24h):{syb}{high ? high : ''},低(24h):{syb}{low ? low : ''},</Text>
            <Text style={styles.detailCenterText}>
              量(24h): {vol ? this.fNum(vol) : '-'},
              额(24h): {syb ? syb : ''}{vol_value ? vol_value : '-'} (第{vol_order ? vol_order : '-'}名)
            </Text>
            <Text style={styles.detailCenterText}>
              总发行量: {amount ? amount : ''},流通量: {circulation ? circulation : ''},
            </Text>
            <Text style={styles.detailCenterText}>
              流通市值: {syb ? syb : ''}{circulation_value},占全球总市值: {value_pct ? value_pct + '%' : '-'} (第{value_order ? value_order : '-'}名)
            </Text>
          </View>
          <View style={styles.detailBottom}>
            <View style={styles.detailChat}>
              <CoinLine lines={lines}/>
            </View>
            <View style={styles.detailBottomMore}>
              <TouchableOpacity onPress={()=>{this._SeeDetailBtn()}}>
                <Text style={styles.detailBottomText}>查看详情></Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        {
          betData ?
            <TouchableOpacity style={styles.guessView} onPress={()=>{
              navigate('GuessRiseFall',{
                coin:coin,
                betData: betData,})}} >
              <View style={styles.guessTitle}>
                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                  <Text style={styles.guessName}>{name}</Text>
                  <Text style={{backgroundColor: '#DA7D7E',padding: 2,marginLeft: 3,color: '#fff',borderRadius:  5}}>进入</Text>
                </View>
                <Text >
                  目前状态：{bet_status === '0' ? '等待中': bet_status === '1' ? '下注中' : '锁定中'}
                </Text>
              </View>
              {
                bet_status === '0' ?
                  <View style={{flexDirection: 'row',marginTop: 10,}}>
                    <Text style={{marginRight: 10,}}>开始时间</Text>
                    <Text>{DateUtils.Formart(new Date(start_time * 1000), 'yyyy-MM-dd hh:mm:ss')}</Text>
                  </View>
                  :
                  <View style={styles.guessMsg}>
                    <View style={{alignItems: 'center'}}>
                      <Text >总奖池：{total_bets} CJL</Text>
                      <View style={styles.tolImg}>
                        <View style={{backgroundColor: 'rgb(253, 0, 63)',width: (up_bets/total_bets)*GuessImg}}/>
                        <View style={{backgroundColor: 'rgb(0, 180, 73)',width: (down_bets/total_bets)*GuessImg}}/>
                      </View>
                      <View style={styles.tolImg}>
                        <View style={{alignItems: 'flex-end',width: GuessImg/2}}>
                          <Text style={{color: 'rgb(253, 0, 63)'}}>涨{up_bets}CJL</Text>
                        </View>
                        <Text >/</Text>
                        <Text style={{color: 'rgb(0, 180, 73)',width: GuessImg/2}}>跌{down_bets}CJL</Text>
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
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
              }
            </TouchableOpacity>
            :
            <View/>
        }

        {
          news && news.length > 0 ?
            <View style={[styles.view, styles.news]}>
              <View style={styles.newTop}>
                <Text style={styles.newTopTitle}>专栏资讯</Text>
              </View>
              <FlatList
                keyExtractor={(item,index) => index}
                data={news.slice(0,5)}
                ItemSeparatorComponent={() => <Separator/>}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={()=>{
                    if(navigation){
                      navigation.navigate('NewDetail', {data: item})
                    }else {
                      onNewPress(item)
                    }

                  }} style={styles.newItem}>
                    <Text style={styles.newItemTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.detailBottomText, {flex: 1, textAlign: 'left'}]}>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>
                      <Text style={styles.detailBottomText}>查看详情></Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.newShowMore}>
                <TouchableOpacity>
                  <Text style={styles.newShowMoreText}>查看更多</Text>
                </TouchableOpacity>
              </View>
            </View>

            : null
        }
        <View style={[styles.view, styles.exchanges]}>
          <View style={styles.newTop}>
            <Text style={styles.newTopTitle}>行情</Text>
          </View>
          <FlatList
            keyExtractor={(item,index) => index}
            style={{flex: 1}}
            data={tickers}
            ItemSeparatorComponent={() => <Separator/>}
            renderItem={({item, index}) => <PairItem ticker={item} />}
          />
        </View>
      </ScrollView>
    )
      ;
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50
  },
  image: {
    height: 25,
    width: 25,
    marginRight: 5
  },
  detailTopPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailTopText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold'
  },
  detailTopBtn: {
    backgroundColor: '#75C1AF',
    borderRadius: 5,
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 2,
    marginTop: 5,
    color: '#fff'
  },
  detailCenterText: {
    fontSize: 12,
    padding:0,
    margin: 0,
    lineHeight: 12,
    color: 'gray',
    marginBottom: 5,
    marginRight: 5,
  },
  detailBottom: {},
  detailChat: {
    height: 200
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
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  newItemTitle: {
    fontSize: 14,
    color: 'black'
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
  exchanges: {},
  guessView:{
    margin: 5,
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  guessTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guessName:{
    fontWeight: 'bold',
    fontSize: 16,
  },
  guessMsg:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tolImg:{
    height: 20,
    width: GuessImg,
    flexDirection: 'row'
  },
});
