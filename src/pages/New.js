import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
} from 'react-native';
import NewItem from '../components/NewItem';
import Separator from '../components/Separator';
import ScrollViewTab from '../components/ScrollViewTab';

export default class New extends Component {
  state = {
    data: [{
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
    ,
    tabs: [
      {
        name:'热门',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'7x24快讯',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'区块链',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'项目活动',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'创新技术',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'大V评说',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'人物访谈',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'原创联盟',
        obj:{
          id:1,
          name:'热门'
        }
      },
      {
        name:'主流区块链专栏',
        obj:{
          id:1,
          name:'热门'
        }
      },

    ]
  }
  _header = () => {
    var style = StyleSheet.create({
      root: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171B35'
      },
      image:{
        height:40,
        width:40,
        margin:5
      },
      text: {
        flex:1,
        textAlign:'center',
        marginRight:50,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
      }
    })
    return (
      <View style={style.root}>
        <Image style={style.image} source={require('../resource/logo.png')}/>
        <Text style={style.text}>币说</Text>
      </View>
    )
  }

  render() {
    var {data, tabs} = this.state;
    return (
      <View style={styles.root}>
        {this._header()}
        <ScrollViewTab ref={(view) => {
          this.scrollViewTab = view;
        }} tabs={tabs} onTabSelect={(item, index, isUser) => {

        }
        }/>
        <View style={styles.container}>
          <FlatList
            ItemSeparatorComponent={() => <Separator/>}
            keyExtractor={(item, index) => item.title}
            data={data}
            renderItem={({item}) => <NewItem data={item}/>}
          />
        </View>
      </View>
    )
      ;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1
  }
});