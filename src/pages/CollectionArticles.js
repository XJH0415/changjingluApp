/**
 * 收藏的文章
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import API from "../lib/dataApi";
import DateUtils from "../utils/DateUtils";

export default class CollectionArticles extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '收藏的文章';
    return {
      headerTitle: headerTitle
    };
  };
  state ={
    data: null
  }

  componentDidMount(){
    let that = this;
    API.getCollectionArticles(null)
      .then(result => that.setState({
        data: result
      }))
      .catch(error => console.error(error))
  }


  _listHeaderComponent(){
    return (
      <View style={styles.titles}>
        <Text style={styles.titleTxt}>文章标题</Text>
        {/*<Text style={styles.titleTxt}>时间</Text>*/}
      </View>
    )
  }
  render() {
    var data = this.state.data;
    var records = [];
    if(!data || !data.data ){
      return(
        <Text>Loading... </Text>
      )
    }else{
      records = data.data.records;
      console.log(records)
      return (
        <View style={styles.root}>
          <FlatList
            ref='FlatList'
            data={records}
            ListHeaderComponent = {this._listHeaderComponent.bind(this)}
            renderItem = {({item,index}) =>
              <TouchableOpacity style={[styles.records,(index+1)%2 === 0 ? {backgroundColor: '#e2f3ef'} : {backgroundColor: '#fff'}]}>
                <Text style={styles.articleTitle}>{item.article.title}</Text>
                {/*<Text>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm')}</Text>*/}
              </TouchableOpacity>
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
    marginTop: 10,
  },
  titleTxt:{
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
  },
  articleTitle:{
    fontSize: 16,
    color:'#000',
  },
  records:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height:30,
  },
})