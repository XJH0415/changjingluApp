/**
 * 打赏model
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image, TouchableOpacity, Alert, Modal,TouchableWithoutFeedback
} from 'react-native';
import Rules from "../utils/Rules";
import API from "../lib/dataApi";

export default class ArticleRewardItem extends Component {

  state = {
    reply: false,
    reward: false,
    rewardNum: [5, 10, 20, 50],
    rewardUser: null,
    tips: '',//打赏的积分
    likes: '',//收藏的数目
    tips_from: [],//打赏的信息（用户等）
    points: null,
  }

  componentDidMount(){
    this.getUserMsg();
  }

  getUserMsg(){
    var that = this;
    API.getLogMe((userMsg)=>{
      that.setState({
        points: userMsg.points
      })
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

  _onPressReward(val) {
    var that = this;
    var data = this.props.data;
    API.ArticleTips(data.article_id, val, (result)=>{
      that.setState({
        tips: result.tips,
        likes: result.likes,
        tips_from: result.tips_from
      })
      Alert.alert('','打赏成功！打赏了' + val + 'CJL')
    })
  }

  render() {
    var {reply, reward, rewardNum, tips, likes, points, tips_from} = this.state;
    var data = this.props.data;
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={()=>{this._RewardBtn()}}>
          <Text style={styles.text}>打赏{tips}</Text>
        </TouchableOpacity>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={reward}
        >
          <View style={styles.modalView}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({reward: false})}>
              <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: null,}}/>
            </TouchableWithoutFeedback>
            <View style={styles.rewardView}>
              <View>
                {/*<TouchableOpacity onPress={() => this.setState({reward: false})}>>*/}
                  {/*<Text>X</Text>*/}
                {/*</TouchableOpacity>*/}
                <Text style={styles.pointsText}>您有{points}个CJL</Text>
              </View>
              <View style={styles.rewardTxt}>
                {
                  rewardNum.map((val) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                        this._onPressReward(val)
                        }}
                        style={styles.touchText}
                      >
                        <Text style={styles.rewardText}>打赏{val}个CJL</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </Modal>

        {/*{*/}
          {/*tips_from !== [] ?*/}
            {/*<Text>... 等人打赏了该文章</Text>*/}
            {/*:*/}
            {/*<View/>*/}
        {/*}*/}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#000',
  },
  touchText:{
    borderRadius: 3,
  },
  rewardText: {
    color: '#75C1AF',
    padding: 3,
    margin: 5,
  },
});