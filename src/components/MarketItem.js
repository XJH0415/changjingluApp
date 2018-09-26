import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Echarts from '../echarts';
import NumUtils from '../utils/NumUtils';
import API from '../lib/dataApi';
import SwipeRow from "./SwipeRow";

export default class MarketItem extends Component {
  static defaultProps = {
    onPress: () => {
    },
    currency: '￥',
    coin: {
      coin_id: null,
      url: null,
      icon: null,
      code: null,
      name_en: null,
      name_cn: null,
      price: null,
      circulation: null,
      vol_24h: null,
      gains_pct_1d: null,
      type: null,
    },
    data: []
  }
  state = {
    data: this.props.data,
    coin: this.props.coin,
    chartWidth: 0,
    chartHeight: 0
  }

  componentDidMount() {
    this.SaveSelfCoins();
  }


  SaveSelfCoins() {
    var {selfCoins} = this.state;
    if (selfCoins !== []) {
      API.SaveMsg('selfCoins', selfCoins)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
      coin: props.coin
    })
  }

  _RemoveCoinWatch(){
    var {coin,} = this.state;
   API.RemoveCoinWatch(coin.coin_id, (result)=>{
     alert(result)
   })
  }

  render() {
    var {currency, onPress} = this.props;
    var {chartWidth, chartHeight, coin, data,} = this.state;
    var {code, name_cn, name_en, price, vol_24h, gains_pct_1d, icon} = coin;
    var option = {
      toolbox: {
        show: false,
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        show: false,

      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        silent: true,
        data: data
      },
      yAxis: {
        type: 'value',
        scale: true,
        silent: true,
        boundaryGap: ['20%', '20%'],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '行情数据',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#74C2AF'
            }
          },
          data: data
        }
      ],
      animation: true
    }
    return (
      <SwipeRow>
        {
          coin.type === 1 ?
            <View>
              <View style={styles.swipeActions}>
                <TouchableOpacity
                  style={styles.delTextContainer}
                  onPress={()=>{this._RemoveCoinWatch()}}
                >
                  <Text>取消自选</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View />
        }
        <TouchableOpacity
          onPress={() => {onPress(coin)}}
          style={styles.root}
        >
          <View style={styles.imageView}>
            <Image style={styles.image} source={{uri: icon}}/>
          </View>
          <View style={styles.leftView}>
            <View>
              <Text numberOfLines={1} style={[styles.text, {fontWeight: 'bold'}]}>{code}</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={[styles.text, {color: 'gray'}]}>{name_cn ? name_cn : name_en}</Text>
            </View>
          </View>
          <View style={styles.rightView}>
            <View>
              <Text numberOfLines={1} style={[styles.text, {
                fontSize: 16,
                fontWeight: 'bold',
                color: gains_pct_1d ? gains_pct_1d * 1 > 0 ? 'rgb(228,36,38)' : 'rgb(65,158,40)' : 'gray'
              }]}>{currency}{price ? (price * 1).toFixed(2) : ''}</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={[styles.text, {
                fontSize: 12,
                color: 'gray'
              }]}>量(24h):{vol_24h ? NumUtils.formatNum(vol_24h) : ''}</Text>
            </View>
          </View>
          <View>
            <Text numberOfLines={1}
                  style={[styles.text, styles.pct, {backgroundColor: gains_pct_1d ? gains_pct_1d * 1 > 0 ? 'rgb(228,36,38)' : 'rgb(65,158,40)' : 'gray'}]}>{gains_pct_1d ? (gains_pct_1d * 1).toFixed(2) + '%' : ''}</Text>
          </View>
          {/*<View style={styles.chart} onLayout={({nativeEvent}) => {*/}
          {/*this.setState({*/}
          {/*chartHeight: nativeEvent.layout.height,*/}
          {/*chartWidth: nativeEvent.layout.width*/}
          {/*})*/}
          {/*}}>*/}
          {/*{chartWidth > 0 && chartHeight > 0 ?*/}
          {/*<Echarts option={option} width={chartWidth} height={chartHeight}/>*/}
          {/*: null*/}
          {/*}*/}

          {/*</View>*/}
        </TouchableOpacity>
      </SwipeRow>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    height: 50,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  chart: {
    height: 40,
    width: 80,
  },
  text: {
    overflow: 'hidden',
    color: 'black'
  },
  imageView: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  image: {
    width: 28,
    height: 28,
    margin: 6
  },
  leftView: {
    marginRight: 5,
    justifyContent: 'center',
    flex: 1,
  },
  rightView: {
    minWidth: 50,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  pct: {
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    marginRight: 5,
    color: 'white',
    minWidth: 70,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  swipeActions:{
    overflow:'hidden',
    ...StyleSheet.absoluteFillObject,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  delTextContainer:{
    width:100,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },
})
