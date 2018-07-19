import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert
} from 'react-native';
import Header from '../components/Header';
import SiteItem from '../components/SiteItem';
import RefreshList from '../components/RefreshList';
import DateUtils from "../utils/DateUtils";
import API from "../lib/dataApi";
export default class Exchange extends Component{
  state={
  
  }
  sort='sa'
  render() {
    return (
      <View style={styles.root}>
        <Header titles={['交易所']} searchType={'sites'} onSearch={(type,data)=>{
          if(type==='sites'){
            var {navigate} = this.props.navigation;
            navigate('SiteDetail', {data: data})
          }
        }}/>
        <RefreshList
          sort={this.sort}
          getList={(page, sort, callback) => {
            this.getList(page, sort, callback)
          }}
          renderItem={(item, index) => {
            return (<SiteItem
              onPress={(data)=>{this.onItemPress(data)}}
              site={item}
            />)
          }}
        />
      </View>
    );
  }
  getList(page, sort, callback) {
    API.getSiteAll(page, sort,(data) => {
      var da = {};
      da.sort = data.sort;
      da.pages = data.pages;
      da.list = data.records;
      callback(da);
    });
  }
  onItemPress(data){
    var {navigate} = this.props.navigation;
    navigate('SiteDetail', {data: data})
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  }
});