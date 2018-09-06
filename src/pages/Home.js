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
        {/*<Text style={styles.goToGuess} onPress={()=>{navigate('GuessRiseFall',{})}}>进入猜涨跌</Text>*/}
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
  },
  goToGuess:{
    width: 200,
    color:'#ffffff',
    backgroundColor: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    borderRadius: 8,
  }
});