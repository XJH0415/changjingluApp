import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import NewItem from '../components/NewItem';
import Separator from '../components/Separator';

export default class New extends Component {
  state={
    data:[{
      title: '标题',
      writer: '作者',
      time: 'yyyy-MM-dd',
      clickRate: 0,
      imtUrl: 'https://changjinglu.info/asset/img/default.ads0.jpg'
    },
      {
        title: '标题',
        writer: '作者',
        time: 'yyyy-MM-dd',
        clickRate: 0,
        imtUrl: 'https://changjinglu.info/asset/img/default.ads0.jpg'
      }]
  }

  render() {
    var data=this.state.data;
    return (
        <View>
          <View style={styles.root}>
            <Text>资讯</Text>
          </View>

          <View style={styles.container}>
            <FlatList
              ItemSeparatorComponent={()=><Separator/>}
              keyExtractor={(item, index) => item.title}
              data={data}
              renderItem={({item}) => <NewItem data={item}/>}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});