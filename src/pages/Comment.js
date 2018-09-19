import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert, TextInput, Dimensions, Image,
  TouchableWithoutFeedback,
} from 'react-native';
import RefreshList from '../components/RefreshList';
import API from '../lib/dataApi';
import CommentItem from '../components/CommentItem';

const deviceWidth = Dimensions.get('window').width;      //设备的宽度

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

  static defaultProps={
    data: null,
    type: null,
  }

  state={
    star: [1,2,3,4,5],
    stars: 0,
    discuss: null,
  }

  getComment(page,sort,callback){
    var that=this;
    var {navigation} = that.props;
    var data =navigation ? navigation.state.params.data : null;
    var type =navigation ? navigation.state.params.type : null;
    if (!data && !type){
      data = this.props.data;
      type = this.props.type;
    }
    var id = '';
    if (type === 'article') {
      id = data.article_id;
    }else {
      id = data.coin_id;
    }
    API.getComment(type,id,page,(data)=>{
      console.log(data)
      callback({sort:sort,list:data.records})
    })

  }

  _onStarBtn(index){
    this.setState({
      stars: index+1,
    })
  }
  _onDiscussText(discuss){
    this.setState({
      discuss: discuss
    })
  }

  _discussBtn(){
    let that = this;
    var {data, type} = this.props.navigation.state.params;
    var {discuss, stars} = this.state;
    // alert(JSON.stringify(data))
    !discuss? Alert.alert('','请输入评论内容') :
      stars === 0 ? Alert.alert('','亲，请评分') :
    API.getMsg('userMsg',(msg)=>{
      if (!msg){
        Alert.alert('','未登录')
      } else{
        var id = '';
        if (type === 'coin'){
          id = data.coin_id;
        } else{
          id = data.article_id;
        }
        API.CommentAdd(type, id, discuss, stars, (result)=>{
          result ? that.refs.RefreshList.refresh() : Alert.alert('','评论失败')
        })
      }
    })
  }


  render(){
    var {star, stars} = this.state;
    return(
      <View style={styles.root}>
        <View style={styles.inputView}>
          <Text style={styles.disTxt}>发布评论</Text>
          <TextInput
            style={styles.input}
            placeholder={'评论内容'}
            multiline={true}
            underlineColorAndroid={'transparent'}
            onChangeText={(discuss)=>{this._onDiscussText(discuss)}}
            maxLength={1000}
          />
          <View style={styles.disStarView}>
            <View style={styles.disStar}>
              <Text>评分</Text>
              <View style={styles.star}>
                {
                  star.map((item, index)=>{
                    var source=require('../resource/star1.png');
                    if (index < stars){
                      source=require('../resource/star.png');
                    }
                    return(
                      <TouchableWithoutFeedback onPress={()=>{this._onStarBtn(index)}}>
                        <Image style={styles.starImage} source={source} />
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>

            </View>
            <TouchableOpacity onPress={()=>{this._discussBtn()}}>
              <Text style={styles.discussBtn}>点评</Text>
            </TouchableOpacity>
          </View>
        </View>
        <RefreshList
          // ref = {(ref)=>{this.refs.RefreshList=ref}}
          ref = 'RefreshList'
          getList={(page, sort, callback) => {
            this.sort=sort;
            this.getComment(page,sort, callback)
          }}
          renderItem={(item, index) => {
            console.log(item)
            return (<CommentItem key={index} record={item} refresh={()=>{this.refs.RefreshList.refresh()}} />)
          }}
        />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  root:{
    flex:1
  },
  inputView:{

  },
  disTxt:{
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
  input:{
    width: deviceWidth-10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#888888',
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
  disStarView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  disStar:{
    flexDirection: 'row',
  },
  star:{
    flexDirection: 'row',
    marginLeft: 5,
  },
  starImage:{
    height:20,
    width:20
  },
  discussBtn:{
    backgroundColor: '#75C1AF',
    color: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
})