import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import API from '../lib/dataApi';

export default class PairItem extends Component {

  static contextTypes={
    userState: PropTypes.string,
    coins: PropTypes.array,
    selfCoins: PropTypes.array,
    selfCoinsString: PropTypes.string,
    myTicker: PropTypes.array,
    myTickerString: PropTypes.string,
    setContextState: PropTypes.func,
    getContextState: PropTypes.func,
  }

  static defaultProps = {
    ticker: {
      code: "1st_btc",
      pair: '',
      pct: "0.00",
      price: "1.0726",
      site: {
        icon: "https://changjinglu.pro/uploads/image/a58/b608ca0bd632d4ccbcd85b9cb9167550_200x200.png",
        name: "中币网",
      },
      site_id: "2",
      syb: "¥",
      update_time: "刚刚",
      vol: "507",
      vol_val: "543.48",
      watching: false
    },
  }

  state = {
    selfCoins: [],
    type: this.context.getContextState().myTickerString[this.props.ticker.code + '_' + this.props.ticker.site_id] ? '1': '0',
  }

  getMeTickers(){
    let that = this;
    var myTic = {};
    API.getMeTickers('', '',(myTicker)=>{
      if (myTicker.length > 0){
        for (let tic of myTicker){
          myTic[tic.code + '_' + tic.site_id] = tic;
        }
        that.context.setContextState({
          myTicker: myTicker,
          myTickerString: myTic
        })
        // alert(JSON.stringify(this.context.getContextState().myTickerString))
      }
    })
  }

  _onPairsBtn() {
    var {ticker, ticker: {site_id,code}, } = this.props;
    var type =this.state.type;
    let {userState, myTicker, myTickerString} = this.context.getContextState();
    var that =this;
    userState === '1' ?
      type === '0' ?
        API.AddPairsWatch(site_id, code, (result) => {
          if (result){
            that.setState({
              type: '1',
            })
            Alert.alert('','已加入自选')
            that.getMeTickers();
          }
        })
        :
        API.RemovePairsWatch(site_id, code, (result) => {
          if (result){
            that.setState({
              type: '0',
            })
            Alert.alert('','已取消自选')
            that.getMeTickers();
          }
        })
      :
      Alert.alert('', '亲，请先登录')
  }

  render() {
    var {ticker: {code, site: {icon, name}, site_id, price, vol, pct, update_time},hide} = this.props;
    let {userState, coins, selfCoins, selfCoinsString, myTicker, myTickerString} = this.context.getContextState();
    var type =this.state.type;
    return (
      <View style={styles.root}>
        <View>
          <Image style={styles.img} source={{uri: icon}}/>
        </View>

        <View style={styles.leftView}>
          <View>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{code.replace('_', '/').toUpperCase()}</Text>
          </View>
          <View>
            <Text style={[styles.text]}>{name.trim()}</Text>
          </View>
        </View>

        <View style={styles.centerView}>
          <View>
            <Text style={[styles.text]}>￥{price.trim()}</Text>
          </View>
          <View>
            <Text numberOfLines={1} style={[styles.text, styles.grayText]}>量(24h):{vol.trim()}</Text>
          </View>
        </View>

        {
          !type ?
            <View style={styles.rightView}>
              <Text style={[styles.text, styles.grayText]}>占比</Text>
              <Text style={[styles.text, styles.grayText]}>{(pct * 1).toFixed(2)}%</Text>
            </View>
            :
            <View/>
        }
        <View style={styles.timeView}>
          <Text style={[styles.text, styles.grayText]}>{update_time.trim()}</Text>
        </View>
        <TouchableOpacity onPress={() => {this._onPairsBtn()}}>
          <Image style={styles.selectImg} source={ type === '1'? require('../resource/star.png'): require('../resource/star1.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 5,

  },
  text: {
    overflow: 'hidden',
    color: 'black'
  },
  grayText: {
    color: 'gray',
    fontSize: 12
  },
  leftView: {
    justifyContent: 'center',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
    marginLeft: 5,
  },
  rightView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5
  },
  timeView: {
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectImg: {
    width: 30,
    height: 30,
    padding: 10,
  }
});  