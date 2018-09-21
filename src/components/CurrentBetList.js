/**
 * 当前猜涨跌期数的用户的竞猜记录
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList
} from 'react-native';

export  default class CurrentBetList extends Component {
  static defaultProps={

  }

  render() {
    var CurrentData= this.props.CurrentData;
    var bets = [];
    if (CurrentData) {
      bets = CurrentData.bets;
    }
    return (
      <View style={styles.root}>
        <Text style={styles.currentTitle}>最近竞猜记录</Text>
        <View style={[styles.betList,{backgroundColor:'#e2f3ef'}]}>
          <Text style={styles.bolds}>用户</Text>
          <Text style={[styles.bolds,{marginRight: 20}]}>涨跌</Text>
          <Text style={[styles.bolds,{marginRight: 60}]}>CJL</Text>
          <Text style={styles.bolds}>下注时间</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => {}}
          data={bets}
          renderItem={({item, index})=>{
            if (index < 10){
              return(
                <View style={styles.betList}>
                  <View style={styles.imgName}>
                    <Image source={{uri: item.user.avatar}} style={styles.img}/>
                    <Text >{item.user.name}</Text>
                  </View>
                  <Text style={{color: item.type === 'up' ? 'rgb(228,36,38)' : 'rgb(65,158,40)'}}>{item.type === 'up' ? '涨' : '跌'}</Text>
                  <Text >{item.bet}</Text>
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
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
  },
  currentTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 5,
  },
  img:{
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  betList:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imgName:{
    flexDirection: 'row'
  },
  bolds:{
    fontWeight: 'bold',
  }
});