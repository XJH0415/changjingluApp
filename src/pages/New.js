import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import NewItem from '../components/NewItem';

export default class New extends Component {
  render() {
    var data = [{
      title: '12321',
      writer: 'zuoz12he',
      time: '2018-621-22',
      clickRate: '112002',
      imtUrl: 'https://changjinglu.info/asset/img/default.ads0.jpg'
    }];
    var separator;
    return (
      separator = () => {
        return <View style={{height: 0.3, backgroundColor: '#8F8F8F'}}/>;
      },
        <View>
          <View style={styles.root}>
            <Text>资讯</Text>
          </View>

          <View style={styles.container}>
            <FlatList
              ItemSeparatorComponent={separator}
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