import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import API from '../lib/dataApi';

const deviceWidth = Dimensions.get('window').width;      //设备的宽度

export default class CommentItem extends Component {
  static defaultProps = {
    record: {},
    refresh: () => {
    }
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

  state = {
    reply: false,
    reward: false,
    points: null,
    data: null,
    rewardNum: [5, 10, 20, 50],
    replyText: null,
    userMsg: null,
    userState: '0'
  }

  componentDidMount() {
    this.getUserMsg();
  }

  getUserMsg() {
    var that = this;
    API.getMsg('userState', (userState) => {
      if (userState) {
        that.setState({
          userState: userState
        })
      }
    })
    API.getLogMe((userMsg) => {
      if (userMsg) {
        that.setState({
          userMsg: userMsg,
        })
      }
    })
  }

  _ReplyBtn() {
    var {reply} = this.state;
    var that = this;
    reply === false ? that.setState({reply: true}) : that.setState({reply: false})
  }

  _RewardBtn() {
    var {reward} = this.state;
    var that = this;
    reward === false ? that.setState({reward: true}) : that.setState({reward: false})
  }

  _ReplyInputText(replyText) {
    this.setState({
      replyText: replyText,
    })
  }

  _onPressReward(val) {
    var that = this;
    var {comment_id} = this.props.record;
    var {userState} = this.state;
    userState === '1' ?
      API.CommentTips(comment_id, val, (result) => {
        result ? (that.props.refresh(), that.setState({reward: false, reply: false})) : Alert.alert('', '亲，打赏失败')
      }, (errorMsg) => {
        errorMsg === 'same user' ? Alert.alert('', '亲，不能给自己打赏') : Alert.alert('', errorMsg)
      })
      :
      Alert.alert('', '亲，未登录')
  }

  _onPressReply() {
    var that = this;
    var {replyText} = this.state;
    var {comment_id} = this.props.record;
    var {userState} = this.state;
    userState === '1' ?
      !replyText ? Alert.alert('', '亲，请输入回复内容')
        :
        API.CommentReply(comment_id, replyText, (result) => {
          result ? (that.props.refresh(), that.setState({reward: false, reply: false})) : alert('亲，回复失败')
        })
      :
      Alert.alert('', '亲，未登录')
  }

  _onPressLike() {
    var that = this;
    var {comment_id} = this.props.record;
    var {userState} = this.state;
    userState === '1' ?
      API.CommentLike(comment_id, (result) => {
        result ? (that.props.refresh(), that.setState({reward: false, reply: false})) : Alert.alert('', '亲，点赞失败')
      }, (errorMsg) => {
        errorMsg === 'already voted' ? Alert.alert('', '亲，您已表过态了') : Alert.alert('', errorMsg)
      })
      :
      Alert.alert('', '亲，未登录')
  }

  _onPressDisLike() {
    var that = this;
    var {comment_id} = this.props.record;
    var {userState} = this.state;
    userState === '1' ?
      API.CommentDisLike(comment_id, (result) => {
        result ? (that.props.refresh(), that.setState({reward: false, reply: false})) : alert('亲，胡扯失败')
      }, (errorMsg) => {
        errorMsg === 'already voted' ? Alert.alert('', '亲，您已表过态了') : Alert.alert('', errorMsg)
      })
      :
      Alert.alert('', '亲，未登录')

  }

  render() {
    var {reply, reward, userState, rewardNum, userMsg} = this.state;
    var {add_time, content, dislikes, likes, stars, tips, replies, user: {name, avatar}} = this.props.record;
    avatar = avatar.indexOf('http') === -1 ? 'https://changjinglu.pro' + avatar : avatar;
    var points = null;
    if (userMsg) {
      points = userMsg.points;
    }
    return (
      <View style={styles.root}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.image} source={{uri: avatar}}/>
            <Text style={[styles.nameText, {flex: 1}]}>{name}</Text>
            <TouchableOpacity
              onPress={() => {
                this._ReplyBtn()
              }}
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
            <TouchableOpacity onPress={() => {
              this._RewardBtn()
            }}>
              <Text style={styles.btnText}>打赏({tips})</Text>
            </TouchableOpacity>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={reward}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => this.setState({reward: false})}>
                  <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: null,}}/>
                </TouchableOpacity>
                <View style={styles.rewardView}>
                  <View>
                    <Text style={styles.pointsText}>您有{points}个CJL</Text>
                  </View>
                  <View style={styles.rewardTxt}>
                    {
                      rewardNum.map((val) => {
                        return (
                          <TouchableOpacity onPress={() => {
                            this._onPressReward(val)
                          }}>
                            <Text style={styles.rewardText}>打赏{val}个CJL</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => {
              this._onPressLike()
            }}>
              <Text style={styles.btnText}>点赞({likes})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this._onPressDisLike()
            }}>
              <Text style={styles.btnText}>胡扯({dislikes})</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          {
            replies.map((item, index) => {
              var {content, user: {avatar, name}} = item;
              avatar = avatar.indexOf('http') === -1 ? 'https://changjinglu.pro' + avatar : avatar;
              return (
                <View style={styles.replieItem} key={index}>
                  <Image style={[styles.image, {}]} source={{uri: avatar}}/>
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
                onChangeText={(replyText) => {
                  this._ReplyInputText(replyText)
                }}
              />
              <TouchableOpacity style={styles.replyBtnTxt} onPress={() => {
                this._onPressReply()
              }}>
                <Text style={{color: '#fff',}}>回复</Text>
              </TouchableOpacity>
            </View>
            :
            <View/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
  },
  topView: {},
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  bottomView: {
    backgroundColor: 'rgb(238,238,238)',
    marginLeft: 30,
    marginRight: 5
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5
  },
  btnsView: {
    flexDirection: 'row',
    marginLeft: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  star: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    marginLeft: 35,
    flex: 1
  },
  nameText: {
    fontWeight: 'bold',
    color: 'black',
  },
  btnText: {
    color: '#75C1AF',
    marginLeft: 5,
    fontSize: 12
  },
  timeText: {
    flex: 1,
    color: 'gray',
    fontSize: 12
  },
  starImage: {
    height: 20,
    width: 20
  },
  replieItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 3
  },
  replieText: {
    color: 'black',
    flex: 1,
  },
  replyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    marginLeft: 35,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: '#888888'
  },
  replyBtnTxt: {
    marginRight: 5,
    marginLeft: 5,
    padding: 2,
    backgroundColor: '#75C1AF',
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  rewardView: {
    backgroundColor: '#333333',
    borderRadius: 5,
    padding: 10,
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
    marginRight: 5,
  },
  rewardTxt: {
    justifyContent: 'center',
  },
  rewardText: {
    width: 90,
    backgroundColor: '#000',
    color: '#75C1AF',
    padding: 3,
    margin: 5,
    borderRadius: 3,
  },

})