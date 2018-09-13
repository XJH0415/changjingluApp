/**
 * 猜涨跌记录
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, Dimensions,
} from 'react-native';
import API from "../lib/dataApi";
import DateUtils from '../utils/DateUtils'
import Separator from '../components/Separator'

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class GuessRecord extends Component {
  static navigationOptions = (options) => {
    var headerTitle = '猜涨跌历史';
    return {
      headerTitle: headerTitle
    };
  };
  constructor(props){
    super(props);//当前页
    this.page = 1;//状态
    this.state = {
      data:[],// 列表数据结构
      isRefresh:false,// 下拉刷新
      isLoadMore:false,// 加载更多
    }
  }
 state = {
   data: null,
   num: 1,
   map:[],
  };

  componentDidMount(){
    let {num,map} =this.state;
    let that = this;
    API.getGuessRecord(num)
      .then(result => that.setState({data: result}))
      .catch(error => console.error(error))
  }

  getDates(time){
    let year = DateUtils.Formart(new Date(time),'yyyy');
    let mouth = DateUtils.Formart(new Date(time),'MM');
    let day = DateUtils.Formart(new Date(time),'dd');
    let hours = DateUtils.Formart(new Date(time),'hh');
    let min = DateUtils.Formart(new Date(time),'mm');
    let seconds = DateUtils.Formart(new Date(time),'ss');
    return new Date().getFullYear() > year ? (new Date().getFullYear() - year)+'年前'
          : new Date().getMonth()+1 > mouth ? (new Date().getMonth()+1 - mouth)+'月前'
            : new Date().getDate() > day ? (new Date().getDate() - day)+'天前'
              : new Date().getHours() > hours ? (new Date().getHours() - hours)+'小时前'
                : new Date().getMinutes() > min ? (new Date().getMinutes() - min)+'分钟前'
                  : new Date().getSeconds() > seconds ? (new Date().getSeconds() - seconds)+'秒前'
                    : '';

  }
  _onRefresh(){
    let {num,data} =this.state;
    let that = this;
    API.getGuessRecord(num)
      .then(result => that.setState({
        data: result,
        num: num+1,
      }))
      .catch(error => console.error(error))
  }

  render() {
    var datas = this.state.data;
    var records = [];
    if( !datas || !datas.data || !datas.data.records){
      return(
        <Text>Loading... </Text>
      )
    }
    else{
      records = datas.data.records;
      console.log(records)
      return (
        <View style={styles.root}>
          <FlatList
            ref='FlatList'
            data={records}
            keyExtractor= {(item, index) => index + item}
            // onRefresh={() => this._onRefresh()}
            renderItem = {({item,index}) =>
              <View >

                <View style={styles.firView}>
                  <View style={styles.nameView}>
                    <Text style={styles.name}>{item.coin_bet.name.replace('猜涨跌第'+item.coin_bet.seq+'期', '')}</Text>
                    <Text style={styles.seq}>第{item.coin_bet.seq}期</Text>
                  </View>

                  <View style={styles.gus}>
                    <Text>
                      {
                        item.coin_bet["bet_status.name"] === '已取消(锁盘失败)' ? '已取消'
                        : item.coin_bet["bet_status.name"] === '下注中' ? '获胜可得:'
                          : item.coin_bet["bet_status.name"] === '锁定中' ? '获胜可得:'
                            : item.wins !== '0' ? ' 已获胜：'
                              : ' 已失败：'
                      }
                    </Text>
                    <Text style={[
                      item.coin_bet["bet_status.name"] === '下注中' || item.coin_bet["bet_status.name"] === '锁定中'?
                        {color: 'rgb(228,36,38)'}
                        :
                        item.wins !== '0' ? {color: 'rgb(228,36,38)'}:{color: 'rgb(65,158,40)'}
                    ]}>

                      {
                        item.coin_bet["bet_status.name"] === '已取消(锁盘失败)' ?
                          '已取消'
                          :
                          item.coin_bet["bet_status.name"] === '下注中' || item.coin_bet["bet_status.name"] === '锁定中'?
                            item.type === 'up' ?
                              '+'+Math.round((item.bet/item.coin_bet.up_bets)*item.coin_bet.total_bets)
                              :
                              '+'+Math.round((item.bet/item.coin_bet.down_bets)*item.coin_bet.total_bets)
                            :
                            item.wins !== '0' ?
                              '+'+item.wins
                              :
                              '-'+item.bet
                      }
                    </Text>
                    <Text>
                      {
                        item.coin_bet["bet_status.name"] === '已取消(锁盘失败)' ? '' : ' CJL'
                      }
                    </Text>
                  </View>

                </View>
                <Separator style={styles.separator}/>
                <View style={styles.secView}>
                  <View>
                    <View style={styles.rows}>
                      <Text style={styles.leftTxt}>我猜:</Text>
                      <Text style={styles.leftbet}>{item.type === 'up' ? '涨' : '跌'}</Text>
                    </View>
                    <View style={styles.rows}>
                      <Text style={styles.leftTxt}>下注:</Text>
                      <Text style={styles.leftbet}>{item.bet}</Text>
                    </View>
                  </View>

                  <View style={styles.rows}>
                    <View style={styles.centerView}>
                      <View style={styles.rows}>
                        <Text>结果:</Text>
                        <Text style={styles.centerBet}>
                          {
                            item.coin_bet["bet_status.name"] === '已取消(锁盘失败)' ? '已取消'
                              : item.coin_bet["bet_status.name"] === '下注中' || item.coin_bet["bet_status.name"] === '锁定中'? '-'
                              : item.type === 'up' ? '跌' : '涨'
                          }
                        </Text>
                      </View>
                      <View style={styles.rows}>
                        <Text>奖池:</Text>
                        <Text style={styles.centerBet}>{item.coin_bet.total_bets}</Text>
                      </View>
                    </View>
                    <View
                      style={[styles.status,
                        item.coin_bet["bet_status.name"] === '下注中' || item.coin_bet["bet_status.name"] === '锁定中'? {backgroundColor:'#888888'}
                          : item.wins !== '0' ? {backgroundColor:'rgb(228,36,38)'}
                          : {backgroundColor:'rgb(65,158,40)'}
                      ]}>
                      <Text
                        style={[styles.statusTxt,
                          item.coin_bet["bet_status.name"] === '下注中' || item.coin_bet["bet_status.name"] === '锁定中'? {color: '#FFFFFF'}
                            : item.wins !== '0' ? {color: '#FFFFFF'}
                            : {color: '#FFFFFF'}
                      ]}>
                        {
                          item.coin_bet["bet_status.name"] === '下注中' ? '下注中'
                          :item.coin_bet["bet_status.name"] === '锁定中' ? '锁定中'
                          : item.wins !== '0' ? '胜利'
                          : '失败'
                        }
                      </Text>
                    </View>
                  </View>
                </View>
                <Separator style={styles.separator}/>
                <View style={styles.gusTime}>
                  <Text>{DateUtils.Formart(new Date(item.add_time*1000),'yyyy-MM-dd hh:mm:ss')}</Text>
                </View>
                <Separator style={{height: 10,}}/>
              </View>
            }

          />
        </View>
      )
    }

  }
}


const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#ffffff',
    paddingTop:10,
  },
  separator:{
    backgroundColor: '#fcfcfc',
    marginLeft:10,
    marginRight:10,
  },
  rows:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  nameView:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name:{
    fontSize: 20,
    color: '#000',
  },

  seq:{
    fontSize: 14,
    color: 'gray',
  },
  gus:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  secView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginLeft: 5,
    marginRight: 5,
  },
  leftTxt:{
    marginLeft: 20,
  },
  leftbet:{
    fontSize: 16,
    fontWeight:'bold',
    color: '#000',
  },
  centerView:{
    width: 80,
    marginRight: 10,
  },
  centerBet:{
    fontSize: 16,
    fontWeight:'bold',
    color: '#000',
  },
  status:{
    width: 50,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gusTime:{
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
})
