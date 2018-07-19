import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import NewItem from '../components/NewItem';
import Separator from '../components/Separator';
import API from '../lib/dataApi';
import RefreshList from '../components/RefreshList';
import DateUtils from '../utils/DateUtils';

export default class NewList extends Component {
  static defaultProps = {
    type: '',
    onItemPress:()=>{},
    key:''
  }
  sort = 'ta'
  
  render() {
    var {onItemPress,key}=this.props
    return (
      <View style={styles.root} key={key}>
        <RefreshList
          sort={this.sort}
          getList={(page, sort, callback) => {
            this.getList(page, sort, callback)
          }}
          renderItem={(item, index) => {
            return (<NewItem
              onPress={(data)=>{onItemPress(data)}}
              title={item.title}
              writer={item.author&&item.author.name?item.author.name:'未知'}
              time={DateUtils.Formart(new Date(item.add_time * 1000), 'MM-dd hh:mm')}
              clickRate={item.views}
              imtUrl={item.cover}
              data={item}
            />)
          }}
        />
      </View>
    )
  }
  
  getList(page, sort, callback) {
    var {type} = this.props;
    API.getNewsPlain(type, page, sort, 1, (data) => {
      var da = {};
      da.sort = data.sort;
      da.pages = data.pages;
      da.list = data.records;
      callback(da);
    });
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  list: {
    flex: 1
  }
})