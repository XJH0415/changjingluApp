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
      <View style={styles.records}>
        <View style={{flex:1}}>
          <Text style={styles.recTxt}>{item.type === 'bet_win' ? item.points : '-'+item.points}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.recTxt}>{item.type === 'bet_win' ? '猜涨跌获胜' : '猜涨跌下注'}</Text>
        </View>
        <View style={{flex:1.5, alignItems: 'flex-end'}}>
          <Text style={styles.recTxt}>{DateUtils.Formart(new Date(item.add_time*1000),'yy-MM-dd hh:mm')}</Text>
        </View>
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
      .catch(error => console.log(error))
  }

}


const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#fcfcfc',
  },
  records:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  recTxt:{
    fontSize: 18,
  }
})