import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Advert from '../components/Advert';
import Notice from '../components/Notice';
import MarketItem from '../components/MarketItem';
import API from '../lib/dataApi';
import Separator from '../components/Separator';
import PairItem from "../components/PairItem";


export default class Home extends Component {

  static contextTypes={
    userState: PropTypes.string,
    userKYCState: PropTypes.string,
    coins: PropTypes.array,
    selfCoins: PropTypes.array,
    selfCoinsString: PropTypes.string,
    myTicker: PropTypes.array,
    myTickerString: PropTypes.string,
    setContextState: PropTypes.func,
    getContextState: PropTypes.func,
  }

  state = {
    coins: [],
    lines: {},
    selfCoins: [],
    myTicker: [],
    userState: '0',
  }

  componentWillMount() {
    var that = this;
    function init() {
      API.getCoins(1, 'va', 'cny', (data) => {
        if (data) {
          that.setState({
            coins: data.coins,
          })
        }
      })
    }
    init();
    that.Interval = setInterval(() => {
      init();
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.Interval);
  }

  mergeArr(Arr1, Arr2, Arr3, Arr4, Arr5, Arr6) {
    var newArr = [];
    for (let arr1 of Arr1) {
      newArr.push(arr1)
    }
    for (let arr2 of Arr2) {
      newArr.push(arr2)
    }
    for (let arr3 of Arr3) {
      newArr.push(arr3)
    }
    for (let arr4 of Arr4) {
      newArr.push(arr4)
    }
    for (let arr5 of Arr5) {
      newArr.push(arr5)
    }
    for (let arr6 of Arr6) {
      newArr.push(arr6)
    }
    return newArr;
  }

  // _onSelfCoinBtn(selfBtn, item, myCoins) {
  //   var that = this;
  //   let {userState, coins, selfCoins, selfCoinsString, myTicker} = this.context.getContextState();
  //   userState === '1' ?
  //     selfBtn === '1' ?
  //       API.RemoveCoinWatch(item.coin_id, (result) => {
  //         if (result) {
  //           // alert('1'+result)
  //           if (myCoins.length>0){
  //             that.context.setContextState({selfCoins: selfCoins.delete(myCoins)})
  //           }
  //         }
  //       })
  //       :
  //       API.AddCoinWatch(item.coin_id, (result) => {
  //         if (result) {
  //           // alert('2'+result)
  //           if (myCoins.length>0) {
  //             that.context.setContextState({selfCoins: selfCoins.push(myCoins)})
  //           }
  //         }
  //       })
  //     :
  //     Alert.alert('', '亲，请先登录')
  // }

  render() {
    const {navigate} = this.props.navigation;
    let {userState, coins, selfCoins, selfCoinsString, myTicker} = this.context.getContextState();
    let newSelfCoins = []
    let newCoins = []
    let newPairs = []
    if (userState === '1' && selfCoins.length !== 0) {
      newCoins.push({type: '行情'})
      newSelfCoins.push({type: '自选币'})
      newPairs.push({type: '自选交易对'})
    }
    if (userState !== '1') {
      newSelfCoins = [];
      selfCoins = [];
      myTicker = [];
    }
    let newCoinData = this.mergeArr(newSelfCoins, selfCoins, newPairs, myTicker, newCoins, coins);
    return (
      <View style={styles.root}>
        <Advert navigate={navigate}/>
        <Notice navigate={navigate}/>
        {/*<Text>{JSON.stringify(this.context.getContextState())}</Text>*/}
        <Separator/>
        <FlatList style={{flex: 1}}
                  data={newCoinData}
                  ItemSeparatorComponent={() => <Separator/>}
                  keyExtractor={(item, index) =>
                    (item.coin_id ? item.coin_id : item.site_id ? item.code + item.site_id : item.type) + index}
                  renderItem={({item, index}) => {
                    if (item.type) {
                      return (
                        <Text style={styles.typeTitle}>{item.type}</Text>
                      )
                    } else {
                      //判断
                      var source = null;
                      var selfBtn = null;
                      selfBtn = '0';
                      source = require('../resource/star1.png');
                      var myCoins= [];
                      if (item.icon && item.icon.path) {
                        myCoins = item;
                        item = {
                          coin_id: item.coin_id,
                          url: item.url,
                          icon: item['icon.small'],
                          code: item.code,
                          name_en: item.name_en,
                          name_cn: item.name_cn,
                          price: item.price_cny,
                          circulation: item.circulation,
                          vol_24h: item.vol_24h,
                          gains_pct_1d: item.gains_pct_1d,
                          type: 1
                        };
                        source = require('../resource/star.png');
                        selfBtn = '1';
                      }
                      return (
                        !item.site ?
                          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                              <MarketItem onPress={(coin) => {
                                navigate('CoinDetail', {coin: coin})
                              }} key={index} currency={'￥'} coin={item}/>
                            </View>
                            {/*{*/}
                              {/*selfBtn === '1' ?*/}
                                {/*<TouchableOpacity*/}
                                  {/*onPress={() => {*/}
                                    {/*this._onSelfCoinBtn(selfBtn, item, myCoins)*/}
                                  {/*}}*/}
                                  {/*style={{*/}
                                    {/*flex: 0.1,*/}
                                    {/*height: 50,*/}
                                    {/*padding: 5,*/}
                                    {/*backgroundColor: '#fff',*/}
                                    {/*justifyContent: 'center',*/}
                                    {/*alignItems: 'center'*/}
                                  {/*}}>*/}
                                  {/*<Image style={{width: 30, height: 30,}} source={source}/>*/}
                                {/*</TouchableOpacity>*/}
                                {/*:*/}
                                {/*<View/>*/}
                            {/*}*/}
                          </View>
                          :
                          <PairItem ticker={item} userState={userState}/>
                      )
                    }
                  }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  goToGuess: {
    width: 200,
    color: '#ffffff',
    backgroundColor: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    borderRadius: 8,
  },
  typeTitle: {
    marginLeft: 5,
    backgroundColor: '#e2f3ef',
    fontSize: 16,
    color: '#000',
  },

});
