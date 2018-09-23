import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text, Dimensions
} from 'react-native';
import Advert from '../components/Advert';
import Notice from '../components/Notice';
import MarketItem from '../components/MarketItem';
import API from '../lib/dataApi';
import Separator from '../components/Separator';

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class Home extends Component {
  state = {
    coins: [],
    lines:{},
    selfCoins: [],
    myTicker:[]
  }

  componentWillMount() {
    var that=this;
    function init(){
      API.getCoins(1,'va','cny',(data)=>{
        that.setState({
          coins:data.coins,
        })
      })
      API.getSelfSelect('1', 'va', (selfCoins)=>{
        that.setState({
          selfCoins:selfCoins.coins.records,
        })
      })
      API.getMeTickers('', '',(myTicker)=>{
        that.setState({
          myTicker:myTicker,
        })
      })
    }
    init();
    that.Interval=setInterval(()=>{
      init();
    },5000)
  }

  componentWillUnmount(){
    clearInterval(this.Interval);
  }

  render() {
    const {navigate} = this.props.navigation;
    var {coins,lines,selfCoins} = this.state;
    var newSelfCoins=[]
    var newCoins=[]
    if (selfCoins.length > 0){
      newCoins.push({type: '行情'})
      newSelfCoins.push({type: '自选'})
      Array.prototype.push.apply(newCoins, coins)

      // alert(JSON.stringify(selfCoins))
      Array.prototype.push.apply(newSelfCoins, selfCoins)

      Array.prototype.push.apply(newSelfCoins, newCoins)
    }
    if (newSelfCoins.length === 0 ){
      newSelfCoins = coins;
    }
    return (
      <View style={styles.root}>
        <Advert navigate={navigate}/>
        <Notice navigate={navigate}/>
        <Separator />
        <FlatList style={{flex: 1}}
                  data={newSelfCoins}
                  ItemSeparatorComponent={() => <Separator/>}
                  keyExtractor={(item) => item.coin_id}
                  renderItem={({item, index}) => {
                    if (item.type) {
                      return(
                        <Text style={styles.title}>{item.type}</Text>
                      )
                    }else {
                      //判断
                      if (item.icon.path){
                        item={
                          coin_id: item.coin_id,
                          url: item.url,
                          icon: item['icon.small'],
                          code: item.code,
                          name_en: item.name_en,
                          name_cn: item.name_cn,
                          price: item.price_cny,
                          circulation: item.circulation,
                          vol_24h: item.vol_24h,
                          gains_pct_1d: item.gains_pct_1d
                        }
                      }
                      return(
                        <MarketItem onPress={(coin) => {
                          navigate('CoinDetail', {coin: coin, type: item.type})
                        }}key={index} currency={'￥'} coin={item} />
                      )
                    }
                  }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  goToGuess:{
    width: 200,
    color:'#ffffff',
    backgroundColor: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    borderRadius: 8,
  },
  title:{
    marginLeft: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    borderTopWidth: 1,
    borderColor: '#E6E6FA',
  }
});