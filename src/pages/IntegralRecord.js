/**
 * 积分记录
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import API from '../lib/dataApi';
import DateUtils from '../utils/DateUtils'

export default class IntegralRecord extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '积分记录';
    return {
      headerTitle: headerTitle
    };
  };

  state ={
    page: 1,
    data:null,
    isRefresh:false,// 下拉刷新
    isLoadMore:false,// 加载更多
  }

  componentDidMount(){
    let that = this;
    var {page,datas} = this.state;
    API.getIntegralRecord(page)
      .then(result =>that.setState({data: result}))
      .catch(error => console.error(error))
  }


  _listHeaderComponent(){
    return (
      <View style={styles.titles}>
        <Text style={styles.titleTxt}>时间</Text>
        <Text style={styles.titleTxt}>事由</Text>
        <Text style={styles.titleTxt}>CJL积分</Text>
      </View>
    )
  }

  render() {
    var {page,datas} = this.state;
    var  data = this.props.navigation.state.params.data;
    var da = this.state.data;
    var records= [];
    if(!da || !da.data || !records){
      return(
        <Text>Loading... </Text>
      )
    }else{
      records= da.data.records;
      return (
        <View style={styles.root}>
          <Text style={styles.points}>我的积分：{data.points}CJL</Text>
          <FlatList
            ref='FlatList'
            data={records}
            ListHeaderComponent = {this._listHeaderComponent.bind(this)}

            // onRefresh={() => this._onRefresh()}
            // refreshing={this.state.isRefresh}

            keyExtractor={(item,index)=>{}}
            renderItem = {({item,index}) =>
              <View style={[styles.records,(index+1)%2 === 0 ? {backgroundColor: '#e2f3ef'} : {backgroundColor: '#fff'}]}>
                <Text style={styles.recTxt}>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>
                <Text style={[styles.rec,styles.recTxt]}>{item.type === 'bet_win' ? '猜涨跌获胜' : '猜涨跌下注'}</Text>
                <Text style={[styles.rec,styles.recTxt]}>{item.type === 'bet_win' ? item.points : '-'+item.points}</Text>
              </View>
            }

          />
        </View>
      )
    }
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