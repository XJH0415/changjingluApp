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
import CoinDetailItem from '../components/CoinDetailItem';

export default class Coins extends Component {
  static defaultProps = {}
  state = {
    selectIndex: 0,
    swiperIndex: 0,
    tabs: [
      {
        name: 'BTC',
        obj: {
          id: 1,
          code: 'BTC'
        }
      },
      {
        name: 'ETH',
        obj: {
          id: 2,
          code: 'ETH'
        }
      },
      {
        name: 'XRP',
        obj: {
          id: 3,
          code: 'XRP'
        }
      },
      {
        name: 'BCH',
        obj: {
          id: 4,
          code: 'BCH'
        }
      },
      {
        name: 'EOS',
        obj: {
          id: 5,
          code: 'EOS'
        }
      },
      {
        name: 'BTC',
        obj: {
          id: 1,
          code: 'BTC'
        }
      },
      {
        name: 'ETH',
        obj: {
          id: 2,
          code: 'ETH'
        }
      },
      {
        name: 'XRP',
        obj: {
          id: 3,
          code: 'XRP'
        }
      },
      {
        name: 'BCH',
        obj: {
          id: 4,
          code: 'BCH'
        }
      },
      {
        name: 'EOS',
        obj: {
          id: 5,
          code: 'EOS'
        }
      },
      {
        name: 'BTC',
        obj: {
          id: 1,
          code: 'BTC'
        }
      },
      {
        name: 'ETH',
        obj: {
          id: 2,
          code: 'ETH'
        }
      },
      {
        name: 'XRP',
        obj: {
          id: 3,
          code: 'XRP'
        }
      },
      {
        name: 'BCH',
        obj: {
          id: 4,
          code: 'BCH'
        }
      },
      {
        name: 'EOS',
        obj: {
          id: 5,
          code: 'EOS'
        }
      }
    ]
  }
  btns = ['COIN', '排行榜'];

  _onSelect = (index) => {
    this.setState({
      selectIndex: index,
    })
  }

  render() {
    var {selectIndex, tabs, swiperIndex} = this.state;
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.root}>
        <Header titles={this.btns} onSelect={this._onSelect}/>
        <Rank isShow={selectIndex === 1} onCoinItemPress={(coin) => {
          navigate('CoinDetail', {coin: coin})
        }}/>
        <View style={[styles.root, selectIndex === 0 ? {display: 'flex'} : {display: 'none'}]}>
          <ScrollViewTab ref={(view) => {
            this.scrollViewTab = view;
          }} tabs={tabs} onTabSelect={(item, index, isUser) => {
            if (isUser) {
              this.swiper.scrollBy(index - this.state.swiperIndex, true)
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
              this.setState({
                swiperIndex: index
              })
              this.scrollViewTab.scrollTo(index)
            }}
          >
            {
              tabs.map((item, index) => {
                return (
                  <CoinDetailItem coinTab={item} key={item.id} selectIndex={swiperIndex} index={index}/>
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