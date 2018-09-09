/**
 * 猜涨跌记录
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, Dimensions,
} from 'react-native';
import API from "../lib/dataApi";
import DateUtils from '../utils/DateUtils'

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class GuessRecord extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '猜涨跌历史';
    if (navigation) {
      data = navigation.state.params.data
      if (data) {
        headerTitle = data.title
      }
    }
    return {
      headerTitle: headerTitle
    };
  };

 state = {
    data: null
  };

  componentDidMount(){
    let that = this;
    API.getGuessRecord(null)
      .then(result => that.setState({
        data: result
      }))
      .catch(error => console.error(error))
  }

  _listHeaderComponent(){
    return (
      <View style={styles.titles}>
        <View style={styles.tol_fir}>
          <Text style={styles.titleTxt}>名称</Text>
          <Text style={styles.titleTxt}>状态</Text>
          <Text style={styles.titleTxt}>时间</Text>
        </View>
        <View style={styles.tol_sec}>
          <Text style={styles.titleTxt}>涨跌</Text>
          <Text style={styles.titleTxt}>结果</Text>
          <Text style={styles.titleTxt}>下注</Text>
          <Text style={styles.titleTxt}>获胜</Text>
        </View>
      </View>
    )
  }

  _renderItem(item){
    return (
      <View style={styles.titles}>
        <Text>{item.coin_bet.name}</Text>
        <Text>{item.coin_bet["bet_status.name"]}</Text>
        <Text>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>
        <Text>{item.type}</Text>
        <Text>{item.wins}</Text>
        <Text>{item.bet}</Text>
        <Text>{item.wins}</Text>
      </View>
    )
  }

  render() {
    var datas = this.state.data;
    var records = [];
    if( !datas || !datas.data || !datas.data.records){
      return(
        <Text>Loading... </Text>
      )
    }
    else{
      records = datas.data.records;
      return (
        <View style={styles.root}>
          <Text style={styles.history}>我的猜涨跌历史</Text>
          <FlatList
            ref='FlatList'
            data={records}
            ListHeaderComponent = {this._listHeaderComponent.bind(this)}
            renderItem = {({item,index}) =>
              <View style={[styles.titles]}>
                <Text>{item.coin_bet.name}</Text>
                <Text>{item.coin_bet["bet_status.name"]}</Text>
                <Text>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>
                <Text>{item.type === 'up' ? '涨' : '跌' }</Text>
                <Text>
                  {
                    item.coin_bet["bet_status.name"] === '已取消(锁盘失败)' ? '-'
                      : item.coin_bet["bet_status.name"] === '下注中' ? '-'
                        : item.wins !== '0' ? item.type === 'up' ? '涨' : '跌'
                          : item.type === 'up' ? '跌' : '涨'
                  }
                </Text>
                <Text>{item.bet}</Text>
                <Text>
                  {
                    item.coin_bet["bet_status.name"] === '已取消(锁盘失败)' ? '-'
                      : item.coin_bet["bet_status.name"] === '下注中' ? '-' : item.wins
                  }
                </Text>
              </View>
            }
            keyExtractor= {(item, index) => index + item}
          />
        </View>
      )
    }

  }
}


const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#fff'
  },
  history:{
    fontSize: 20,
    color:'#000000'
  },
  titles:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 1,
    marginLeft: 1,
  },
  gus:{

  },
  titleTxt:{
    marginLeft: 2,
    fontSize: 14,
  },
  tol_fir: {
    width:deviceWidth*0.7,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  tol_sec:{
    width:deviceWidth*0.3,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
  },

})