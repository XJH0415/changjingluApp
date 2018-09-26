/**
 * 当前猜涨跌期数
 * 当前登录用户的竞猜记录
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList
} from 'react-native';

export  default class MyBetsList extends Component {

  render() {
    var CurrentData= this.props.CurrentData;
    var bets = [];
    if (CurrentData) {
      bets = CurrentData.me.bets;
    }
    if (bets.length > 10){
      bets = bets.slice(bets.length-10, bets.length)
    }
    return (
      <View style={styles.root}>
        <Text style={styles.myTitle}>我的竞猜记录</Text>
        <View style={[styles.betList, {backgroundColor:'#e2f3ef'}]}>
          <View style={{flex: 1}}>
            <Text style={styles.bolds}>涨跌</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.bolds}>CJL</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.bolds}>下注时间</Text>
          </View>
        </View>
        <FlatList
          keyExtractor={(item, index) => index+item.bet}
          data={bets.reverse()}
          renderItem={({item, index})=>{
            if (index < 10){
              return(
                <View style={styles.betList} >
                  <View style={{flex: 1}}>
                    <Text style={{color: item.type === 'up' ? 'rgb(228,36,38)' : 'rgb(65,158,40)'}}>{item.type === 'up' ? '涨' : '跌'}</Text>
                  </View >
                  <View style={{flex: 1}}>
                    <Text >{item.bet}</Text>
                  </View>
                  <View style={{flex: 2}}>
                    <Text>{item.add_time}</Text>
                  </View>
                </View>
              )
            }
          }}
        />
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: '#fff'
  },
  myTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5,
    marginTop: 10,
  },
  betList:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  bolds:{
    fontWeight: 'bold',
  }
});
