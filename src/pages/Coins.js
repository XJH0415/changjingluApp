import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import Header from '../components/Header';
import Rank from '../components/Rank';
import ScrollViewTab from '../components/ScrollViewTab';
import CoinDetail from './CoinDetail';

export default class Coins extends Component {
  static defaultProps = {}
  state = {
    selectIndex: 0,
    tabs: [
      {
        id: 1,
        code: 'BTC'
      }, {
        id: 1,
        code: 'ETH'
      }, {
        id: 1,
        code: 'XRP'
      }, {
        id: 1,
        code: 'BCH'
      }, {
        id: 1,
        code: 'EOS'
      }, {
        id: 1,
        code: 'LTC'
      }, {
        id: 1,
        code: 'XLM'
      }, {
        id: 1,
        code: 'ADA'
      }]
  }
  btns = ['COIN', '排行榜'];

  _onSelect = (index) => {
    this.setState({
      selectIndex: index
    })
  }
  index = 0;
  swiperIndex = 0;

  render() {
    var {selectIndex, tabs} = this.state;
    return (
      <View style={styles.root}>
        <Header btns={this.btns} onSelect={this._onSelect}/>
        <Rank isShow={selectIndex === 1}/>
        <View style={[styles.root, selectIndex === 0 ? {display: 'flex'} : {display: 'none'}]}>
          <ScrollViewTab ref={(view) => {
            this.scrollViewTab = view;
          }} tabs={tabs} onTabSelect={(item, index, isUser) => {
            if (isUser) {
              this.swiper.scrollBy(index - this.swiperIndex, true)
            }
          }
          }
          />
          <Swiper
            ref={(view) => {
              this.swiper = view
            }}
            style={[styles.swiper]}
            horizontal={true}
            loop={false}
            autoplay={false}
            showsButtons={false}
            showsPagination={false}
            onIndexChanged={(index) => {
              this.swiperIndex = index;
              this.scrollViewTab.scrollTo(index)
            }}
          >
            {
              tabs.map((item, index) => {
                return (
                  <CoinDetail coin={item}/>
                )
              })
            }
          </Swiper>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
})