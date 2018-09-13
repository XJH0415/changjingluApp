import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RefreshList from '../components/RefreshList';
import API from "../lib/dataApi";
import DateUtils from '../utils/DateUtils'

class RecordsItem extends Component{
  static defaultProps ={
    item:{},
    index:0,
  }
  render(){
    var {item, index} = this.props;
    return(
      <View style={[styles.records,(index+1)%2 === 0 ? {backgroundColor: '#e2f3ef'} : {backgroundColor: '#fff'}]}>
        <Text style={styles.recTxt}>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>
        <Text style={[styles.rec,styles.recTxt]}>{item.type === 'bet_win' ? '猜涨跌获胜' : '猜涨跌下注'}</Text>
        <Text style={[styles.rec,styles.recTxt]}>{item.type === 'bet_win' ? item.points : '-'+item.points}</Text>
      </View>
    )
  }
}

export default class IntegralRecord extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '积分记录';
    return {
      headerTitle: headerTitle
    };
  };

  render() {
    var  data = this.props.navigation.state.params.data;
    return (
      <View style={styles.root}>
        <Text style={styles.points}>我的积分：{data.points}CJL</Text>
        <View style={styles.titles}>
          <Text style={styles.titleTxt}>时间</Text>
          <Text style={styles.titleTxt}>事由</Text>
          <Text style={styles.titleTxt}>CJL积分</Text>
        </View>
        <RefreshList
          sort={'news'}
          getList={(page, sort, callback) => {
            this.getList(page, sort, callback)
          }}
          renderItem={(item, index) => {
            return (<RecordsItem item={item} index={index}/>)
          }}
        />
      </View>
    )
  }

  getList(page, sort, callback){
    API.getIntegralRecord(page)
      .then(result =>{
        let da={};
        da.pages = Math.ceil(result.data.total/result.data.size);
        da.sort = sort;
        da.list = result.data.records;
        callback(da);
      })
      .catch(error => console.error(error))
  }

}


const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  points:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titles:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleTxt:{
    fontSize: 18,

  },
  records:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom:5,
  },
  rec:{
    marginRight: 50,
  },
  recTxt:{
    fontSize: 16,
  }
})