import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  View
} from 'react-native';
import API from '../lib/dataApi'
import CoinItem from './CoinItem';
import Separator from './Separator';
import Dropdown from './Dropdown';

export default class RefreshList extends Component {
  static defaultProps = {
    getList:()=>{},
    renderItem:()=>{},
    sort:'va',
  }
  state = {
    lists: [],
    refreshing: false,
    isShow: this.props.isShow,
    sort:this.props.sort
  }
  isRefreshMore = false;
  data = {};
  isGetingData=false;
  componentWillMount() {
    this.refresh(this.state.sort);
  }
  componentWillReceiveProps(props) {
    this.setState({
      sort: props.sort,
    })
  }
  render() {
    var {lists, refreshing,sort} = this.state;
    var {renderItem} = this.props;
    return (
      <View style={[styles.root]}>
        <FlatList style={styles.root}
                  onRefresh={() => this.refresh(sort)}
                  ItemSeparatorComponent={() => <Separator/>}
                  refreshing={refreshing}
                  onEndReached={() => this.refreshMore(!this.data[this.sort]?1:this.data[this.sort].page + 1)}
                  onEndReachedThreshold={1}
                  data={lists}
                  keyExtractor={(item,index) => index}
                  renderItem={({item, index}) => {return renderItem(item,index)}}
        />

      </View>
    );
  }

  refresh(sort) {
    if (!sort){
      sort = this.props.sort;
    }
    if (!this.state.refreshing) {
      this.setState({
        refreshing: true
      })
      this.getLists(1, sort);
    }
  }

  refreshMore(page) {
    if (!this.isRefreshMore) {
      if (page === 1) this.refresh(this.sort);
      if (this.data[this.sort].page === page) return;
      this.isRefreshMore = true;
      this.getLists(page, this.sort);
    }

  }

  getLists(page, sort) {
    var that = this;
    var {getList}=that.props;
    setTimeout(() => {
      if(that.isGetingData)return;
      that.isGetingData=true;
      if (!that.data[sort]) {
        that.data[sort]={}
      }
      if (!that.data[sort].page){
        that.data[sort].page=0;
      }
      getList(page, sort,(data) => {
        that.isGetingData=false;
        var {sort, list, pages} = data;
        if (page === 1 || page - that.data[sort].page === 1) {
          if (page === 1) {//当page为1时，清空旧数据
            that.data[sort]?that.data[sort].lists = []:that.data[sort]={lists:[],page:0};
          } else {
            that.isRefreshMore = false;
          }
          if(!that.data[sort]){
            that.data[sort]={lists:[],page:0};
          }
          for (let li of list) {
            that.data[sort].lists.push(li)
          }
          that.data[sort].page = page;
          that.showLists(sort);
        } else if (page - that.data[sort].page > 1) {
          that.getLists(page - 1, sort)
        }
      })
    }, 1000);
    //防止网络错误
    setTimeout(() => {
      if (that.state.refreshing) {
        that.setState({
          refreshing: false
        })
        that.isRefreshMore = false;
        that.isGetingData = false;
      }
    }, 8000)
  }
  
  showLists(sort) {
    this.sort = sort;
    this.setState({
      lists: this.data[sort].lists,
      refreshing: false,
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
  }
});