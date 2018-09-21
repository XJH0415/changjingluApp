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
    return (
      <View style={styles.root}>
        <Text style={styles.myTitle}>我的竞猜记录</Text>
        <View style={[styles.betList, {backgroundColor:'#e2f3ef', paddingRight: 50}]}>
          <Text style={styles.bolds}>涨跌</Text>
          <Text style={styles.bolds}>CJL</Text>
          <Text style={styles.bolds}>下注时间</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => {index}}
          data={bets}
          renderItem={({item, index})=>{
            if (index < 10){
              return(
                <View style={styles.betList} >
                  <Text style={{color: item.type === 'up' ? 'rgb(228,36,38)' : 'rgb(65,158,40)'}}>{item.type === 'up' ? '涨' : '跌'}</Text>
                  <Text style={{marginLeft: 20}}>{item.bet}</Text>
                  <Text>{item.add_time}</Text>
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
    fontSize: 20,
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