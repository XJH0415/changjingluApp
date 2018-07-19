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
import API from '../lib/dataApi';

export default class Coins extends Component {
  static defaultProps = {}
  state = {
    selectIndex: 0,
    titles: ['COIN', '排行榜'],
    tabs: []
  }
  views = {}
  _onSelect = (index) => {
    this.setState({
      selectIndex: index,
    })
  }
  
  componentWillMount() {
    this.getTabs();
  }
  
  getTabs() {
    var that=this;
    API.getCoinsByCoin_Ids([1,2,3,7,6],1,'va','cny',(data)=>{
      var tabs=[];
      for(var coin of data.coins){
        tabs.push({
          title:coin.code,
          coin:coin
        })
      }
      that.setState({
        tabs:tabs
      })
    })
  }
  
  render() {
    var {selectIndex, tabs, titles} = this.state;
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.root}>
        <Header titles={titles} onSelect={this._onSelect} onSearch={(type,data)=>{
          if(type==='coins'){
            navigate('CoinDetail', {coin: data})
          }
        }} headerSelect={selectIndex} searchType={'coins'}/>
        <ScrollableTabView
          renderTabBar={() => <View style={{height: 0}}/>}
          locked={false}
          page={selectIndex}
          onChangeTab={({i}) => {
            this.setState({
              selectIndex: i
            })
          }}
        >
          {
            tabs.length>0?
              <ViewPage
                key={'viewPage'}
                data={tabs}
                renderItem={(item, index) => <CoinDetail navigate={(key,data)=>{
                  navigate(key,data)
                }} coin={item.coin} onNewPress={(data)=>{
                  navigate('NewDetail', {data: data})
                }} key={index} tabLabel={item.title}/>}
              />
              :<View/>
          }
          
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