import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Separator from '../components/Separator';
import API from '../lib/dataApi';
import SitePairItem from '../components/SitePairItem';
import DateUtils from "../utils/DateUtils";

export default class SiteDetail extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '交易所详情';
    if (navigation) {
      data = options.navigation.state.params.data
      if (data) {
        headerTitle = data.name_cn
      }
    }
    return {
      headerTitle: headerTitle
    }
  };
  state = {
    isRefreshing: false,
    data: {},
    site: null,
    total: 0,
    time: 0
  }
  
  _onRefresh() {
    var that = this;
    that.setState({
      isRefreshing: true
    })
    var {navigation} = this.props;
    var site = {};
    if (navigation) {
      site = navigation ? navigation.state.params.data : {}
    }
    var {site_id, desc} = site;
    API.getSiteRich(site_id, (data) => {
      var total = 0;
      console.log('111' + data)
      console.log(data)
      var time = parseInt(new Date().getTime() / 1000)
      if (data.prices) {
        for (var price of data.prices) {
          total += price.vol * price.price
        }
        that.setState({
          data: data,
          total: total,
          time: time
        })
      }
      
    });
    if (!desc) {
      API.getSitePlain(site_id, (data) => {
        that.setState({
          site: data
        })
      })
    }
    setTimeout(() => {
      that.setState({
        isRefreshing: false
      })
    }, 5000)
  }
  
  componentWillMount() {
    this._onRefresh()
  }
  
  render() {
    var {navigation} = this.props;
    var {data: {prices, news}, site, total, time} = this.state;
    var da = site;
    if (!da) {
      da = navigation ? navigation.state.params.data : {}
    }
    var {site_id, icon, name_cn, desc, shortDesc, homePage,} = da;
    var vol = da['24hourVol'] * 1;
    var source = {uri: icon ? icon : ''};
    
    return (
      <ScrollView
        style={styles.root}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._onRefresh()}
          />}
      >
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.image} source={source}/>
            <Text style={styles.title}>{name_cn}</Text>
          </View>
          <Text style={styles.desc}>{shortDesc}</Text>
          <Text style={styles.text}>官方网站:{homePage}</Text>
          {
            vol > 0 ?
              <Text style={styles.text}>交易量:{vol}</Text>
              : null
          }
        </View>
        {
          news && news.length > 0 ?
            <View style={[styles.view, styles.news]}>
              <View style={styles.newTop}>
                <Text style={styles.newTopTitle}>公告</Text>
              </View>
              <FlatList
                data={news.slice(0,5)}
                ItemSeparatorComponent={() => <Separator/>}
                renderItem={({item, index}) => (
                  <TouchableOpacity style={styles.newItem}>
                    <Text style={styles.newItemTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.detailBottomText, {
                        flex: 1,
                        textAlign: 'left'
                      }]}>{DateUtils.Formart(new Date(item.publish_time * 1000), 'yyyy-MM-dd hh:mm')}</Text>
                      <Text style={styles.detailBottomText}>查看详情></Text>
                    </View>
                  </TouchableOpacity>)
                }
              />
              <View style={styles.newShowMore}>
                <TouchableOpacity>
                  <Text style={styles.newShowMoreText}>查看更多</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            : null
        }
        <View style={[styles.view, styles.exchanges]}>
          <View style={styles.newTop}>
            <Text style={styles.newTopTitle}>行情</Text>
          </View>
          <FlatList
            style={{flex: 1}}
            data={prices ? prices : []}
            ItemSeparatorComponent={() => <Separator/>}
            keyExtractor={(item, index) => item.code + index}
            renderItem={({item, index}) => <SitePairItem ticker={item} time={time} total={total}/>}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    marginTop: 0,
    backgroundColor: 'white'
  },
  topView: {
    padding: 5
  },
  titleView: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: 'black'
  },
  desc: {
    fontSize: 14,
    color: 'black'
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray'
  },
  view: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 10,
  },
  newTop: {
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#E6E6FA',
    borderBottomWidth: 1
  },
  newTopTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#75C1AF',
    marginLeft: 5
  },
  exchanges: {},
  news: {},
  newItem: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  newItemTitle: {
    fontSize: 14,
    color: 'black'
  },
  detailBottomText: {
    fontSize: 12,
    textAlign: 'right',
    color: 'gray',
    lineHeight: 16
  },
  newShowMore: {
    height: 26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newShowMoreText: {
    fontSize: 14,
    color: 'gray'
  },
})