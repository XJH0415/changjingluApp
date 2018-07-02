import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import Header from '../components/Header';
import Rank from '../components/Rank';
import ViewPage from '../components/ViewPage';
import CoinDetail from '../pages/CoinDetail';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Coins extends Component {
  static defaultProps = {

  }
  state = {
    selectIndex: 0,
    titles: ['COIN', '排行榜'],
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
      }
    ]
  }
  views={}
  _onSelect = (index) => {
    this.setState({
      selectIndex: index,
    })
  }

  render() {
    var {selectIndex, tabs, titles} = this.state;
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.root}>
        <Header titles={titles} onSelect={this._onSelect} headerSelect={selectIndex} searchType={'coin'}/>
        <ScrollableTabView
          renderTabBar={() => <View style={{height:0}}/>}
          locked={false}
          page={selectIndex}
          onChangeTab={({i}) => {
            this.setState({
              selectIndex:i
            })
          }}
        >
          <ViewPage
            key={'viewPage'}
            data={tabs}
            renderItem={(item, index) => <CoinDetail key={index} tabLabel={item.name}/>}
          />
          <Rank
            key={'Rank'}
            onCoinItemPress={(coin) => {
              navigate('CoinDetail', {coin: coin})
            }}/>
        </ScrollableTabView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
})