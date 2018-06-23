import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  View
} from 'react-native';
import API from '../lib/dataApi'
import CoinItem from '../components/CoinItem';
import Separator from '../components/Separator';

export default class Rank extends Component {
  static defaultProps = {}
  state = {
    coins: [],
    refreshing: false,
    sortText: '排序方式',
    sortSign: 1
  }
  coinsMap = new Map();
  sort = 'va';
  isRefreshMore=false;
  data = {
    'va': {
      page: 0,
      coins: []
    },
    'vd': {
      page: 0,
      coins: []
    },
    'pa': {
      page: 0,
      coins: []
    },
    'pd': {
      page: 0,
      coins: []
    },
    'ca': {
      page: 0,
      coins: []
    },
    'cd': {
      page: 0,
      coins: []
    },
    'ta': {
      page: 0,
      coins: []
    },
    'td': {
      page: 0,
      coins: []
    },
    'ga': {
      page: 0,
      coins: []
    },
    'gd': {
      page: 0,
      coins: []
    }
  }

  componentWillMount() {
    this.refresh();
  }

  _header = () => {
    var {sortText, sortSign} = this.state;
    return (
      <View style={styles.header}>
        <View style={styles.headerName}>
          <Text style={[styles.headerText, {textAlign: 'left'}]}>名称</Text>
        </View>
        <View style={styles.headerPrice}>
          <Text style={[styles.headerText, {textAlign: 'right'}]}>价格</Text>
        </View>
        <View style={[styles.headerSort, styles.sort]}>
          <Text style={[styles.headerText, {textAlign: 'right'}]}>{sortText}</Text>
          <Image style={styles.sortImage}
                 source={sortSign > 0 ? require('../resource/上.png') : require('../resource/下.png')}/>
        </View>
      </View>
    );
  }

  render() {
    var {sort, coins, refreshing} = this.state;
    return (
      <View style={styles.root}>
        {this._header()}
        <FlatList style={styles.root}
                  onRefresh={() => this.refresh(this.sort)}
                  ItemSeparatorComponent={()=><Separator/>}
                  refreshing={refreshing}
                  onEndReached={() => this.refreshMore(this.data[this.sort].page + 1)}
                  onEndReachedThreshold={1}
                  data={coins}
                  keyExtractor={(item) => item.code}
                  renderItem={({item, index}) => (
                    <CoinItem sort={sort} coin={item} no={index + 1}/>
                  )}
        />

      </View>
    );
  }

  refresh(sort) {
    if (!this.state.refreshing) {
      this.setState({
        refreshing: true
      })
      this.getCoins(1, sort, 'cny');
    }
  }

  refreshMore(page) {
    if(!this.isRefreshMore){
      if (page === 1) this.refresh(this.sort);
      if (this.data[this.sort].page === page) return;
      this.isRefreshMore=true;
      this.getCoins(page, this.sort, 'cny');
    }

  }

  getCoins(page, sort, currency) {
    var that = this;
    setTimeout(() => {
      API.getCoins({
        page: page,
        sort: sort,
        currency: currency
      }, (body) => {
        if (body.no === 0) {
          var {sort, coins} = body.data;
          if (page === 1 || page - that.data[sort].page === 1) {
            if (page === 1) {//当page为1时，清空旧数据
              that.data[sort].coins = [];
            }else {
              that.isRefreshMore=false;
            }
            for (let coin of coins) {
              that.data[sort].coins.push(coin)
            }
            that.data[sort].page = page
            that.showCoins(sort);
          } else if (page - that.data[sort].page > 1) {
            that.getCoins(page - 1, sort, currency)
          }

        }
      })
    }, 1000);
    //防止网络错误
    setTimeout(() => {
      if (that.state.refreshing) {
        that.setState({
          refreshing: false
        })
        that.isRefreshMore=false;
      }
    }, 80000)
  }

  showCoins(sort) {
    this.sort = sort;
    var s = this.getSortSign(sort);
    this.setState({
      sort: sort,
      coins: this.data[sort].coins,
      refreshing: false,
      sortSign: s.sortSign,
      sortText: s.sortText
    })
  }

  getSortSign(sort) {
    switch (sort) {
      case 'va':
        return {sortSign: -1, sortText: '流通市值'}
      case 'vd':
        return {sortSign: 1, sortText: '流通市值'}
      case 'pa':
        return {sortSign: -1, sortText: '价格'}
      case 'pd':
        return {sortSign: 1, sortText: '价格'}
      case 'ca':
        return {sortSign: -1, sortText: '流通量'}
      case 'cd':
        return {sortSign: 1, sortText: '流通量'}
      case 'ta':
        return {sortSign: -1, sortText: '交易量'}
      case 'td':
        return {sortSign: 1, sortText: '交易量'}
      case 'ga':
        return {sortSign: -1, sortText: '涨幅'}
      case 'gd':
        return {sortSign: 1, sortText: '涨幅'}
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#171B35'
  },
  headerName: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  headerPrice: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  sort: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerSort: {
    minWidth: 80,
    marginLeft: 5,
    marginRight: 5
  },
  sortImage: {
    width: 20,
    height: 20
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#75C1AF'
  }
});