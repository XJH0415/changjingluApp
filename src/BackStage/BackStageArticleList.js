/**
 * 后台文章
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text
} from 'react-native';

export  default class BackStageArticleList extends Component {

  static defaultProps = {
    articleMap:[
      {
        title: '币圈凉凉奥术大师东方闪电佛挡杀佛是',
        AuditStatus: '审核通过',
      },{
        title: '漏洞赏金',
        AuditStatus: '审核通过',
      },{
        title: '反弹来了么',
        AuditStatus: '审核通过',
      },{
        title: '区块链技术',
        AuditStatus: '审核通过',
      }]
  }

  state = {

  }

  ArticleTop(){
    return(
      <View style={styles.row}>
        <View style={[styles.topTit, {flex: 0.05}]}>
          <Text>#</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.65}]}>
          <Text>标题</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.2}]}>
          <Text>审核状态</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.1}]}>
          <Text>操作</Text>
        </View>
      </View>
    )
  }

  ArticleList(item, index){
    return(
      <View style={styles.row}>
        <View style={[styles.topTit, {flex: 0.05}]}>
          <Text>{index+1}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.65}]}>
          <Text numberOfLines={1}>{item.title}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.2}]}>
          <Text>{item.AuditStatus}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.1}]}>
          <Text>编辑</Text>
        </View>
      </View>
    )
  }

  render() {
    var {articleMap} = this.props;
    return (
      <ScrollView>
        <FlatList
          keyExtractor={(item, index) => index}
          data={articleMap}
          ListHeaderComponent={()=>this.ArticleTop()}
          renderItem={({item, index})=> this.ArticleList(item, index)}
        />
      </ScrollView>
    );
  }

}

const styles=StyleSheet.create({
  row:{
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  topTit:{
    justifyContent: 'center',
  },
});