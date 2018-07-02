import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default class ViewPage extends Component {
  static defaultProps = {
    data: [],
    renderItem: null,
  }
  state = {
    data: this.props.data
  }
  defaultRenderItem = (item, index) => {
    return (
      <Text key={index}
            tabLabel={item.tabTitle ? item.tabTitle : '第' + (index + 1) + '页'}>
        {item.tabTitle ? item.tabTitle : '第' + (index + 1) + '页'}
      </Text>
    )
  }
  componentWillReceiveProps(props){
    this.setState({
      isShow:props.isShow,
      data:props.data
    })
  }
  render() {
    var {data} = this.state;
    var {renderItem} = this.props;
    return (
      <View style={[styles.root]}>
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar tabStyle={{paddingLeft: 10, paddingRight: 10}}/>}
          tabBarUnderlineStyle={{backgroundColor: '#75C1AF'}}
          tabBarBackgroundColor='white'
          tabBarActiveTextColor='#75C1AF'
          tabBarInactiveTextColor='black'
          tabBarTextStyle={{fontSize: 16}}
          prerenderingSiblingsNumber={1}
          onChangeTab={({i}) => {
          }}
        >
          {
            data.map((item, index) => {
              var itemView=renderItem?renderItem(item, index):this.defaultRenderItem(item, index);
              return itemView
            })
          }
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});