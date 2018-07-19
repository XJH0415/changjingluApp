import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert
} from 'react-native';
import RefreshList from '../components/RefreshList';
import API from '../lib/dataApi';
import CommentItem from '../components/CommentItem';
export default class Comment extends Component{
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '点评';
    if (navigation) {
      data = options.navigation.state.params.data
      if (data) {
        headerTitle = data.code?data.code+'点评':'点评'
      }
    }
    return {
      headerTitle: headerTitle
    }
  }
  getComment(page,sort,callback){
    var that=this;
    var {navigation} = that.props;
    var coin =navigation ? navigation.state.params.data : null;
    if(coin){
      API.getComment('coin',coin.coin_id,page,(data)=>{
        console.log(data)
        callback({sort:sort,list:data.records})
      })
    }
    
  }
  render(){
    return(
      <View style={styles.root}>
        <RefreshList
          getList={(page, sort, callback) => {
            this.getComment(page,sort, callback)
          }}
          renderItem={(item, index) => {
            console.log(item)
            return (<CommentItem key={index} record={item}/>)
          }}
        />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  root:{
    flex:1
  }
})