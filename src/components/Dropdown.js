import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet,TouchableOpacity} from 'react-native';
import Separator from './Separator';

export default class Dropdown extends Component {
  static defaultProps = {
    data: [
      {
        text: '流通市值降序',
        sort: 'va'
      },
      {
        text: '流通市值升序',
        sort: 'vd'
      },
      {
        text: '流通量降序',
        sort: 'ca'
      },
      {
        text: '流通量升序',
        sort: 'cd'
      },
      {
        text: '交易量降序',
        sort: 'ta'
      },
      {
        text: '交易量升序',
        sort: 'td'
      },
      {
        text: '涨幅降序',
        sort: 'ga'
      },
      {
        text: '涨幅升序',
        sort: 'gd'
      },
    ],
    style: {},
    onPress: () => {
    }
  }
  state = {
    isShow:false,
    selectIndex: 0
  }

  render() {
    var {data, style} = this.props;
    var {selectIndex,isShow} = this.state;
    return (
      isShow?
      <View style={[styles.root, style]}>
        <FlatList style={{flex: 1}}
                  data={data}
                  ItemSeparatorComponent={() => <Separator/>}
                  keyExtractor={(item) => item}
                  renderItem={({item, index}) =>
                    <TouchableOpacity style={styles.btn} onPress={() => this.onPress(item, index)}>
                      <Text style={[styles.text, selectIndex === index ? styles.select : {}]}>{item.text}</Text>
                    </TouchableOpacity>
                  }
        />
      </View>
        :null
    )
  }

  onPress(item, index) {
    var {onPress} = this.props;
    this.setState({
      selectIndex: index,
      isShow:false
    })
    onPress(item, index);
  }
  onclick(){
    var {isShow}=this.state;
    if(isShow){
      this.hide();
    }else {
      this.show();
    }
  }
  show(){
    this.setState({
      isShow:true,
    })
  }
  hide(){
    this.setState({
      isShow:false,
    })
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    zIndex: 2,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopWidth: 0,
    maxHeight:200
  },
  btn: {
    height: 40,
  },
  text: {
    lineHeight: 40,
    marginLeft: 5,
    marginRight: 5,
    color: 'black',
    textAlign: 'center'
  },
  select: {
    color: '#75C1AF',
    fontWeight: 'bold',
  }
});