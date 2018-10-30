/**
 * 评论管理
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView, FlatList,
} from 'react-native';

export  default class ReviewManagement extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '评论管理';
    return {
      headerTitle: headerTitle
    };
  };

  static defaultProps  = {
    Review:[
      {
        time: '1539483053802',
        obj: '币',
        id: '3',
        content: '瑞波要回位了',
        userId: '38',
        status: '正常',
      },{
        time: '1539483043444',
        obj: '文章',
        id: '1',
        content: '123',
        userId: '6',
        status: '正常',
      },{
        time: '1539483033469',
        obj: '币',
        id: '512',
        content: '还有谁',
        userId: '6',
        status: '已删除',
      },{
        time: '1539483022658',
        obj: '币',
        id: '1',
        content: '没什么',
        userId: '6',
        status: '已删除',
      },]
  }

  ReviewTop(){
    return(
      <View style={styles.row}>
        <View style={[styles.topTit, {flex: 0.04}]}>
          <Text>#</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.2}]}>
          <Text>评论时间</Text>
        </View>
        {/*<View style={[styles.topTit, {flex: 0.1}]}>*/}
          {/*<Text>对象</Text>*/}
        {/*</View>*/}
        {/*<View style={[styles.topTit, {flex: 0.15}]}>*/}
          {/*<Text>对应ID</Text>*/}
        {/*</View>*/}
        <View style={[styles.topTit, {flex: 0.5}]}>
          <Text>内容</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.15}]}>
          <Text>用户ID</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.15}]}>
          <Text>状态</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.1}]}>
          <Text>操作</Text>
        </View>
      </View>
    )
  }

  ReviewList(item, index){
    return(
      <View style={styles.row}>
        <View style={[styles.topTit, {flex: 0.04}]}>
          <Text>{index+1}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.2}]}>
          <Text numberOfLines={1}>{item.time}</Text>
        </View>
        {/*<View style={[styles.topTit, {flex: 0.1}]}>*/}
          {/*<Text>{item.obj}</Text>*/}
        {/*</View>*/}
        {/*<View style={[styles.topTit, {flex: 0.15}]}>*/}
          {/*<Text>{item.id}</Text>*/}
        {/*</View>*/}
        <View style={[styles.topTit, {flex: 0.5}]}>
          <Text numberOfLines={1}>{item.content}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.15}]}>
          <Text>{item.userId}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.15}]}>
          <Text>{item.status}</Text>
        </View>
        <View style={[styles.topTit, {flex: 0.1}]}>
          <Text>编辑</Text>
        </View>
      </View>
    )
  }

  render() {
    var {Review} = this.props;
    return (
      <View style={styles.root}>
        <ScrollView>
          <FlatList
            keyExtractor={(item, index) => index}
            data={Review}
            ListHeaderComponent={()=>this.ReviewTop()}
            renderItem={({item, index})=> this.ReviewList(item, index)}
          />
        </ScrollView>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
  },
  row:{
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  topTit:{
    justifyContent: 'center',
  },
});