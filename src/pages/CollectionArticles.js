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
  Image,
} from 'react-native';
import API from "../lib/dataApi";
import DateUtils from "../utils/DateUtils";
import Separator from "../components/Separator";

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
    data: null,
  }

  componentDidMount(){
    this.refresh();
  }

  refresh(){
    this.getCollectionArticles();
  }

  getCollectionArticles(){
    let that = this;
    API.getCollectionArticles(null)
      .then(result => that.setState({
        data: result
      }))
      .catch(error => {}
        // console.log(error)
      )
  }

  _ArticleDelete(article_id){
    // alert(article_id);
    let that = this;
    API.ArticleUnLike(article_id,(result)=>{
       that.refresh();
    })
  }

  _listHeaderComponent(){
    return (
      <View style={styles.titles}>
        <TouchableOpacity >

        </TouchableOpacity>
      </View>
    )
  }
  render() {
    var {data} = this.state;
    var {navigate} = this.props.navigation;
    var records = [];
    if(!data || !data.data ){
      return(
        <Text>Loading... </Text>
      )
    }else{
      records = data.data.records;
      // console.log(data)
      return (
        <View style={styles.root}>
          <FlatList
            ref='FlatList'
            data={records}
            ListHeaderComponent = {this._listHeaderComponent.bind(this)}
            ItemSeparatorComponent={() => <Separator/>}
            renderItem = {({item,index}) =>
              <TouchableOpacity
                style={styles.records}
                onPress={() => {
                  navigate('NewDetail', {data: records[index].article})
                }}
              >
                <Text
                  style={styles.articleTitle}
                  numberOfLines={1}
                >{item.article && item.article.title ? item.article.title : ''}</Text>
                <TouchableOpacity style={styles.deleteTouch} onPress={()=>{this._ArticleDelete(item.article_id)}}>
                  <Image style={styles.deleteImg} source={require('../resource/ArticleDelete.png')}/>
                </TouchableOpacity>
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
    backgroundColor: '#fcfcfc',
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
    color: '#DA7D7E',
  },
  articleTitle:{
    flex: 1,
    color:'#000',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  records:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    height:30,
  },
  deleteTouch:{
    padding: 5,
    paddingRight: 10,
  },
  deleteImg:{
    height: 20,
    width: 20,
  },
})