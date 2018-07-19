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
    lines:{}
  }

  componentWillMount() {
    var that=this;
    API.getCoins(1,'va','cny',(data)=>{
      var coin_ids='';
      that.setState({
        coins:data.coins,
      })
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    var {coins,lines} = this.state;
    return (
      <View style={styles.root}>
        <Advert/>
        <Notice/>
        <FlatList style={{flex: 1}}
                  data={coins}
                  ItemSeparatorComponent={() => <Separator/>}
                  keyExtractor={(item) => item.coin_id}
                  renderItem={({item, index}) => <MarketItem onPress={(coin) => {
                    navigate('CoinDetail', {coin: coin})
                  }}key={index} currency={'￥'} coin={item}/>}
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