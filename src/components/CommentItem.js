import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class CommentItem extends Component {
  static defaultProps = {
    record: {}
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

  _ReplyBtn(){

  }

  render() {
    var {add_time, content, dislikes, likes, stars, tips, replies, user: {name, avatar}} = this.props.record;
    avatar=avatar.indexOf('http')===-1?'https://changjinglu.pro'+avatar:avatar;
    return (
      <View style={styles.root}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.image} source={{uri: avatar}}/>
            <Text style={[styles.nameText,{flex:1}]}>{name}</Text>
            <View style={styles.star}>
              {this._renderStar(stars === 0 ? 0 : stars).map((item, index) => {
                return item;
              })}
            </View>
            <TouchableOpacity
              onPress={this._ReplyBtn}
            >
              <Text style={styles.btnText}>回复</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{content}</Text>
          <View style={styles.btnsView}>
            <Text style={styles.timeText}>{add_time}</Text>
            <Text style={styles.btnText}>打赏({tips})</Text>
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
  }
  
  
})