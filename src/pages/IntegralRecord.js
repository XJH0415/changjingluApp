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

  state ={
    data: null
  }

  componentDidMount(){
    let that = this;
    API.getIntegralRecord(null)
      .then(result => that.setState({data: result}))
      .catch(error => console.error(error))
  }

  _listHeaderComponent(){
    return (
      <View style={styles.titles}>
        <Text style={styles.titleTxt}>时间</Text>
        <Text style={styles.titleTxt}>事由</Text>
        <Text style={styles.titleTxt}>CJL</Text>
      </View>
    )
  }

  render() {
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
            renderItem = {({item,index}) =>
              <View style={styles.records}>
                <Text>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>
                <Text>{item.type === 'bet_win' ? '猜涨跌获胜' : '猜涨跌下注'}</Text>
                <Text>{item.type === 'bet_win' ? item.points : '-'+item.points}</Text>
              </View>
            }
            keyExtractor={(item,index)=>{}}
            refreshing={true}
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
  point:{
    marginTop: 10,
    fontSize: 16,
  },
  titles:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTxt:{

  },
  records:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})