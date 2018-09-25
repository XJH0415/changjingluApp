import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text, Dimensions,
  TouchableOpacity
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
    myTicker:[],
    userState: '0',
  }

  componentDidMount(){
    API.getMsg('userState', (userState)=>{
      this.setState({
        userState:userState,
      })
    })
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
      API.getMsg('userState', (userState)=>{
        that.setState({
          userState:userState,
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

  mergeArr(Arr1, Arr2, Arr3, Arr4){
    var newArr = [];
    for (let arr1 of Arr1){
      newArr.push(arr1)
    }
    for (let arr2 of Arr2){
      newArr.push(arr2)
    }
    for (let arr3 of Arr3){
      newArr.push(arr3)
    }
    for (let arr4 of Arr4){
      newArr.push(arr4)
    }
    return newArr;
  }

  render() {
    const {navigate} = this.props.navigation;
    let {coins,lines,selfCoins, userState} = this.state;
    let newSelfCoins=[]
    let newCoins=[]
    if (userState === '1'&& selfCoins.length>0){
      newCoins.push({type: '行情'})
      newSelfCoins.push({type: '自选'})
    }

    let newCoinData = this.mergeArr(newSelfCoins, selfCoins, newCoins, coins);
    return (
      <View style={styles.root}>
        <Advert navigate={navigate}/>
        <Notice navigate={navigate}/>
        <Separator/>
        <FlatList style={{flex: 1}}
                  data={newCoinData}
                  ItemSeparatorComponent={() => <Separator/>}
                  keyExtractor={(item,index) => (item.coin_id ? item.coin_id : item.type)+index}
                  renderItem={({item, index}) => {
                    if (item.type) {
                      return(
                        <Text style={styles.typeTitle}>{item.type}</Text>
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
                          gains_pct_1d: item.gains_pct_1d,
                          type: 1
                        }
                      }
                      return(

                            <MarketItem onPress={(coin) => {
                              navigate('CoinDetail', {coin: coin})
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
  typeTitle:{
    marginLeft: 5,
    backgroundColor: '#e2f3ef',
    fontSize: 16,
    color: '#000',
  },
});
