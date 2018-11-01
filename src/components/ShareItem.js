/**
 * 文章分享
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image, Alert, Text, TouchableWithoutFeedback, Modal
} from 'react-native';
import * as WeChat from 'react-native-wechat'

export default class BetRulesItem extends Component {

  static defaultProps = {}

  state={
    isWeChat:false,
  }

  componentDidMount() {
    WeChat.registerApp('wxfe22c90996a2f051')

  }

  _ShareToWeiChatFriend(data) {
    var {title, summary, cover, article_id, content} = data;
    // alert(JSON.stringify(data))
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToSession({
            title: title,
            description: summary,
            thumbImage: cover,
            type: 'news',
            webpageUrl: 'https://changjinglu.pro/article/view/'+article_id
          })
            .catch((error) => {
              Alert.alert(error.message);
            });
        } else {
          Alert.alert('请安装微信');
        }
      });
    this.setState({isWeChat: false})
  }

  _ShareToWeiChatFriendCircle(data){
    var {title, summary, cover, article_id, content} = data;
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToTimeline({
            title: title,
            description: summary,
            thumbImage: cover,
            type: 'news',
            webpageUrl: 'https://changjinglu.pro/article/view/'+article_id
          })
            .catch((error) => {
              Alert.alert(error.message);
            });
        } else {
          Alert.alert('请安装微信');
        }
      });
    this.setState({isWeChat: false})
  }
  render() {
    var {data} = this.props;
    var {isWeChat} = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.row}>
          <TouchableOpacity style={{marginRight: 10,}} onPress={()=>{this.setState({isWeChat: true})}}>
            <Image source={require('../resource/WeiChatShare.png')} style={styles.img}/>
          </TouchableOpacity>
          {/*<TouchableOpacity>*/}
            {/*<Image source={require('../resource/QQShare.png')} style={styles.img}/>*/}
          {/*</TouchableOpacity>*/}
        </View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={isWeChat}
        >
          <View style={styles.modalView}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({isWeChat: false})}>
              <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: null,}}/>
            </TouchableWithoutFeedback>
            <View style={styles.rewardView}>
              <View style={styles.touch}>
                <Text>分享到微信</Text>
              </View>
              <View style={{flexDirection: 'row',}}>
                <TouchableOpacity
                  style={[styles.touch,{marginRight: 20}]}
                  onPress={()=>{this._ShareToWeiChatFriend(data)}}>
                  <Image source={require('../resource/WeiChatFriend.png')} style={styles.img}/>
                  <Text>分享到好友</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touch}
                  onPress={()=>{this._ShareToWeiChatFriendCircle(data)}}>
                  <Image source={require('../resource/WeiChatFriendCircle.png')} style={styles.img}/>
                  <Text>分享到朋友圈</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginRight: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    width: 30,
    height: 30,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  rewardView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  touch:{
    alignItems: 'center'
  }
});