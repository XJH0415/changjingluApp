import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert
} from 'react-native';
import Advert from '../components/Advert';
import Notice from '../components/Notice';
import MarketItem from '../components/MarketItem';
import API from '../lib/dataApi';
import Separator from '../components/Separator';

export default class Home extends Component {
  state = {
    coins: [],
  }

  componentWillMount() {
    var that=this;
    API.getCoins(1,'va','cny',(data)=>{
      var coin_ids='';
      for(let coin of data.coins){
        coin_ids+=coin.coin_id+',';
      }
      coin_ids=coin_ids.substring(0,coin_ids.length-1)
      API.getKlines(coin_ids,'cny',(da)=>{
        var coins=[];
        for(let coin of data.coins){
          coin.line=da.klines[coin.coin_id]?da.klines[coin.coin_id]:[];
          coins.push(coin)
        }
        that.setState({
          coins:coins,
        })
      })
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    var {coins} = this.state;
    return (
      <View style={styles.root}>
        <Advert/>
        <Notice/>
        <FlatList style={{flex: 1}}
                  data={coins}
                  ItemSeparatorComponent={() => <Separator/>}
                  keyExtractor={(item) => item.coin_id}
                  renderItem={({item, index}) => <MarketItem key={index} currency={'￥'} coin={item} data={item.line}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});