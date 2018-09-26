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
          <View style={styles.imgName}>
            <Text style={styles.bolds}>用户</Text>
          </View>
          <View style={styles.types}>
            <Text style={styles.bolds}>涨跌</Text>
          </View>
          <View style={styles.bet}>
            <Text style={styles.bolds}>CJL</Text>
          </View>
          <View style={styles.add_time}>
            <Text style={styles.bolds}>下注时间</Text>
          </View>
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
                    <Text >{
                      item.user.name ?
                        (item.user.name.length > 5 ? item.user.name.substr(0, 5) + "..."
                          : item.user.name)
                        : ''}
                          </Text>
                  </View>
                  <View style={styles.types}>
                    <Text style={[{color: item.type === 'up' ? 'rgb(228,36,38)' : 'rgb(65,158,40)'}]}>{item.type === 'up' ? '涨' : '跌'}</Text>
                  </View>
                  <View style={styles.bet}>
                    <Text >{item.bet}</Text>
                  </View>
                  <View style={styles.add_time}>
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
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
  },
  currentTitle:{
    fontWeight: 'bold',
    fontSize: 16,
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
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imgName:{
    flex: 1,
    flexDirection: 'row'
  },
  types:{
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bet:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_time:{
    flex: 2
  },
  bolds:{
    fontWeight: 'bold',
  }
});
