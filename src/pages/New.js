import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  Alert
} from 'react-native';
import ViewPage from '../components/ViewPage';
import Header from '../components/Header';
import NewList from '../components/NewList';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import API from '../lib/dataApi';

export default class New extends Component {
  state = {
    selectIndex: 0,
    titles: ['资讯', '专栏'],
    tabs1:[],
    tabs2:[]
  }
  _onSelect = (index) => {
    this.setState({
      selectIndex: index,
    })
  }
  render() {
    var {selectIndex,tabs1,tabs2, titles} = this.state;
    return (
      <View style={styles.root}>
        <Header titles={titles} onSelect={this._onSelect} headerSelect={selectIndex} searchType={'new'}/>
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
          {
            tabs2.length>0?
              <ViewPage
                key={'viewPage1'}
                data={tabs2}
                renderItem={(item, index) =><NewList key={index+''} onItemPress={(data)=>this.onItemPress(data)} tabLabel={item.title} type={item.code}/>}
              />
              :null
          }
          {
            tabs1.length>0?
            <ViewPage
              key={'viewPage2'}
              data={tabs1}
              renderItem={(item, index) =><NewList key={index+''} onItemPress={(data)=>this.onItemPress(data)} tabLabel={item.title} type={item.code}/>}
            />
              :null
          }
        </ScrollableTabView>
      </View>
    )
  }
  onItemPress(data){
    var {navigate} = this.props.navigation;
    navigate('NewDetail', {data: data})
  }
  
  componentWillMount() {
    this.getTabs();
  }
  
  getTabs(){
    
    var that=this;
    API.getNewsBar(function (data) {
      var tabs1=[];
      var tabs2=[];
      tabs2.push({code:'', title:'热门'});
      for(let ne of Object.keys(data)){
        if(Array.isArray(data[ne])){
          for(let v of data[ne]){
            tabs1.push({
              code:v.code,
              title:v.code,
            });
          }
        }else {
          tabs2.push({
            code:data[ne].code,
            title:data[ne].name,
          });
        }
      }
      
      that.setState({
        tabs1:tabs1,
        tabs2:tabs2
      })
    })
  }
  

}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});