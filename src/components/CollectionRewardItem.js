/**
 * 文章收藏打赏功能
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import API from '../lib/dataApi';
import ArticleRewardItem from "./ArticleRewardItem";
import ShareItem from "./ShareItem";

export  default class CollectionRewardItem extends Component {

  state = {
    collect: false,
    userState: '',
  }

  ArticleLike(){
    var { collect } = this.state;
    var data = this.props.data;
    var that = this;
    if (collect === false){//加入收藏
      that.setState({
        collect: true,
      });
      // alert(JSON.stringify(data))
      API.ArticleLike(data.article_id, (result)=>{
        // alert(JSON.stringify(result))
        if (result){
          Alert.alert('', '收藏成功！');
        }
      })
    }
  }

  ArticleUnLike(){
    var { collect } = this.state;
    var data = this.props.data;
    var that = this;
    if(collect === true){//撤销收藏
      that.setState({
        collect: false,
      })
      API.ArticleUnLike(data.article_id, (result)=>{
        // alert(JSON.stringify(result))
      })
      Alert.alert('', '取消收藏成功！');
    }
  }
  render() {
    var { collect } = this.state;
    var data = this.props.data;
    var source = null;
    return (
      <View style={styles.root}>
        {
          !collect ?
            <TouchableOpacity style={styles.collect} onPress={()=>{this.ArticleLike()}}>
              <Image style={styles.img} source={require('../resource/star1.png')}/>
              <Text style={styles.text}>收藏</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.collect} onPress={()=>{this.ArticleUnLike()}}>
              <Image style={styles.img} source={require('../resource/star.png')}/>
              <Text style={styles.text}>收藏</Text>
            </TouchableOpacity>
        }
        <ArticleRewardItem data={data}/>
        <ShareItem data={data}/>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
  },
  collect:{
    flexDirection: 'row',
    marginRight: 20,
  },
  img:{
    width: 20,
    height: 20,
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
  },
});