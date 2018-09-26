/**
 * 涨跌选择按钮
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import API from '../lib/dataApi';

export default class SelectButtonItem extends Component {

  static defaultProps = {
    onSubBtn: (coin_bet_id, type, betNum)=>{},
  }

  //0默认，1选中
  state = {
    fall: 0,
    rise: 0,
    betNum: 0,//猜的数值
    array: [],
    userMsg: this.props.userMsg,
  };

  _onRiseBtn() {
    let that = this;
    var {fall, rise} = this.state;
    rise === 0 ?
      that.setState({
        rise: 1,
        fall: 0,
      })
      :
      null
  }

  _onFallBtn() {
    let that = this;
    var {fall, rise} = this.state;
    fall === 0 ?
      that.setState({
        rise: 0,
        fall: 1,
      })
      :
      null
  }

  _InputNum(betNum) {
    this.setState({
      betNum: betNum,
    });
  }

  _AddBet() {
    var {rise, fall, betNum, array} = this.state;
    var {coin_bet_id} = this.props.betData;
    let type = '';
    if (rise === 1) {
      type = 'up';
    } else if (fall === 1) {
      type = 'down';
    } else {
      Alert.alert('', '亲，请选择涨跌');
      return;
    }
    if (betNum === 0) {
      Alert.alert('', '亲，请输入数值')
      return;
    }
    if (betNum < 10) {
      Alert.alert('', '亲，最低竞猜额为10个CJL');
      return;
    }
    // alert(coin_bet_id+','+type+','+betNum)
    this.props.onSubBtn(coin_bet_id, type, betNum)
  }

  render() {
    var {points} = this.props;
    var {fall, rise} = this.state;
    return (
      <View style={styles.root}>
        <Text style={styles.selectTitle}>我要竞猜</Text>
        <View style={styles.select}>
          <TouchableOpacity style={styles.touch} onPress={() => {
            this._onRiseBtn()
          }}>
            {
              rise === 0 ?//初始
                <Image style={styles.selectImg} source={require('../resource/radio-button-off.png')}/>
                :
                <Image style={styles.selectImg} source={require('../resource/radio-button-on.png')}/>

            }
            <Text style={styles.selectText}>猜涨</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={() => {
            this._onFallBtn()
          }}>
            {
              fall === 0 ?//初始
                <Image style={styles.selectImg} source={require('../resource/radio-button-off.png')}/>
                :
                <Image style={styles.selectImg} source={require('../resource/radio-button-on.png')}/>
            }
            <Text style={styles.selectText}>猜跌</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <TextInput
            ref='textInput'
            style={styles.input}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'#888888'}
            placeholder={'请输入数值'}
            onChangeText={this._InputNum.bind(this)}
            onEndEditing={()=>{this.refs.textInput.blur();}}
          />
          <TouchableOpacity style={styles.myGuessBtn} onPress={() => {
            this._AddBet();
          }}>
            <Text style={styles.myGuessText}>我猜</Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginLeft: 5, marginTop: 5, color: '#888'}}>
          最低竞猜额为10个CJL，您有{points}个CJL.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  select: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  selectTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 5,
  },
  selectImg: {
    width: 20,
    height: 20,
  },
  touch: {
    flexDirection: 'row',
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  selectText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputView: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  input: {
    margin: 0,
    width: 200,
    height: 30,
    padding: 3,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 30,
  },
  myGuessBtn: {
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myGuessText: {
    color: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
  }
});
