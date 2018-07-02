import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  Alert
} from 'react-native';
import ViewPage from '../components/ViewPage';
import Header from '../components/Header';
import NewList from '../components/NewList';

export default class New extends Component {
  state = {
    tabs: [
      {
        tabTitle:'热门',
        obj:{}
      },
      {
        tabTitle:'7x24快讯',
        obj:{}
      },
      {
        tabTitle:'区块链',
        obj:{}
      },
      {
        tabTitle:'项目活动',
        obj:{}
      },
      {
        tabTitle:'创新技术',
        obj:{}
      },
      {
        tabTitle:'大V评说',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        tabTitle:'人物访谈',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        tabTitle:'原创联盟',
        obj:{}
      },
      {
        tabTitle:'主流区块链专栏',
        obj:{}
      },

    ]
  }
  render() {
    var {tabs} = this.state;
    return (
      <View style={styles.root}>
        <Header titles={['币说']} searchType={'new'}/>
        <ViewPage
          data={tabs}
          renderItem={(item,index)=>{return <NewList key={index} tabLabel={item.tabTitle}/>}}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});