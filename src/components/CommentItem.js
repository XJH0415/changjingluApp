import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;      //设备的宽度

export default class CommentItem extends Component {
  static defaultProps = {
    record: {},
    rewardNum:['5','10','20','50']
  }

  _renderStar(star) {
    var attr = [];
    for (var i = 0; i < 5; i++) {
      if (i < star) {
        attr.push(<Image style={styles.starImage} key={i + ''} source={require('../resource/star.png')}/>)
      } else {
        attr.push(<Image style={styles.starImage} key={i + ''} source={require('../resource/star1.png')}/>)
      }
    }
    return attr;
  }

  state={
    reply: false,
    reward: false,
  }

  _ReplyBtn(){
    var {reply} = this.state;
    var that = this;
    reply === false ? that.setState({reply: true}) : that.setState({reply: false})
  }

  _RewardBtn(){
    var {reward} = this.state;
    var that = this;
    reward === false ? that.setState({reward: true}) : that.setState({reward: false})
  }

  _ReplyInputText(){

  }

  _rewardItem(item){
    return(
      <TouchableOpacity >打赏{item}个CJL</TouchableOpacity>
    )
  }

  _rewardList(){
    return(
      <View>
        <Text>123</Text>
      </View>
    )
  }
  render() {
    var {reply, reward} = this.state;
    var {rewardNum, } = this.props;
    var {add_time, content, dislikes, likes, stars, tips, replies, user: {name, avatar}} = this.props.record;
    avatar=avatar.indexOf('http')===-1?'https://changjinglu.pro'+avatar:avatar;
    return (
      <View style={styles.root}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.image} source={{uri: avatar}}/>
            <Text style={[styles.nameText,{flex:1}]}>{name}</Text>
            <TouchableOpacity
              onPress={()=>{this._ReplyBtn()}}
              style={{flexDirection: 'row'}}
            >
              <View style={styles.star}>
                {this._renderStar(stars === 0 ? 0 : stars).map((item, index) => {
                  return item;
                })}
              </View>
              <Text style={styles.btnText}>回复</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{content}</Text>
          <View style={styles.btnsView}>
            <Text style={styles.timeText}>{add_time}</Text>
            <TouchableOpacity onPress={()=>{this._RewardBtn()}}>
              <Text style={styles.btnText}>打赏({tips})</Text>
            </TouchableOpacity>
            <Text style={styles.btnText}>点赞({likes})</Text>
            <Text style={styles.btnText}>胡扯({dislikes})</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          {
            replies.map((item,index)=>{
              var {content,user:{avatar,name}}=item;
              avatar=avatar.indexOf('http')===-1?'https://changjinglu.pro'+avatar:avatar;
              return (
                <View style={styles.replieItem} key={index}>
                  <Image style={[styles.image,{}]} source={{uri: avatar}}/>
                  <Text style={styles.nameText}>{name}:</Text>
                  <Text style={styles.replieText}>{content}</Text>
                </View>
              )
            })
          }
        </View>
        {
          reply === true ?
            <View style={styles.replyBtn}>
              <TextInput
                style={styles.replyInput}
                autoCapitalize='none'
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#888888'}
                placeholder={'请输入回复内容'}
                selectionColor={'rgb(65,158,40)'}
                onChangeText={()=>{this._ReplyInputText()}}
              />
              <TouchableOpacity style={styles.replyBtnTxt}>
                <Text style={{color: '#fff',}}>回复</Text>
              </TouchableOpacity>
            </View>
            :
            <View />
        }
        {
          reward === true ?
            <View style={styles.rewardBtn}>
              <FlatList
                data={rewardNum}
                ListHeaderComponent={()=>{this._rewardList()}}
                renderItem={({item}) => {this._rewardItem(item)}}
              />
            </View>
            :
            <View />
        }
      </View>
    )
  }
}

const styles=StyleSheet.create({
  root:{
    padding:5
  },
  topView:{

  },
  titleView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
    marginBottom:5
  },
  bottomView:{
    backgroundColor: 'rgb(238,238,238)',
    marginLeft:30,
    marginRight:5
  },
  image:{
    height:30,
    width:30,
    borderRadius:15,
    marginRight:5
  },
  btnsView:{
    flexDirection:'row',
    marginLeft:35,
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
    marginBottom:5
  },
  star:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  text:{
    color:'black',
    marginLeft:35,
    flex:1
  },
  nameText:{
    fontWeight:'bold',
    color:'black',
  },
  btnText:{
    color: '#75C1AF',
    marginLeft:5,
    fontSize:12
  },
  timeText:{
    flex:1,
    color:'gray',
    fontSize:12
  },
  starImage:{
    height:20,
    width:20
  },
  replieItem:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    margin:3
  },
  replieText:{
    color:'black',
    flex:1,
  },
  replyBtn:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyInput:{
    margin: 0,
    padding: 0,
    flex: 1,
    marginLeft: 35,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: '#888888'
  },
  replyBtnTxt:{
    marginRight: 5,
    marginLeft: 5,
    padding: 2,
    backgroundColor: '#75C1AF',
    borderRadius: 5,
  },
  rewardBtn:{

  }
})