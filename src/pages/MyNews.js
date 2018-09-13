import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RefreshList from '../components/RefreshList';
import Separator from '../components/Separator';
import API from "../lib/dataApi";
import DateUtils from '../utils/DateUtils'

class ArticleItem extends Component{
  static defaultProps ={
    item:{},
    index:0,
  }
  render(){
    var {item, index} = this.props;
    return(
      <TouchableOpacity
        style={[styles.records,(index+1)%2 === 0 ? {backgroundColor: '#e2f3ef'} : {backgroundColor: '#fff'}]}>
        <Text
          style={styles.articleTitle}
          numberOfLines={1}
        >{item.article.title}</Text>
      </TouchableOpacity>
    )
  }
}

export default class MyNews extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '我的消息';
    return {
      headerTitle: headerTitle
    };
  };

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.titles}>
          <TextInput />
          <Text style={styles.titleTxt}>搜索框</Text>
        </TouchableOpacity>
        <RefreshList
          sort={'news'}
          getList={(page, sort, callback) => {
            this.getList(page, sort, callback)
          }}
          renderItem={(item, index) => {
            return (<ArticleItem item={item} index={index}/>)
          }}
        />
      </View>
    )
  }

  getList(page, sort, callback){
    API.getCollectionArticles(page)
      .then(result =>{
        let da={};
        da.pages = Math.ceil(result.data.total/result.data.size);
        da.sort = sort;
        da.list = result.data.records;
        console.log(result)
        callback(da);
      })
      .catch(error => console.error(error))
  }

}


const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  titles:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  titleTxt:{
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  articleTitle:{
    color:'#000',
    marginLeft: 10,
    marginRight: 10,
  },
  records:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height:30,
  },
})