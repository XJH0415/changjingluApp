import React,{Component} from 'react';
import {View,FlatList,StyleSheet} from 'react-native';
import NewItem from '../components/NewItem';
import Separator from '../components/Separator';

export default class NewList extends Component{
  static defaultProps={
    type:''
  }
  state={
    data:[1,2]
  }
  render(){
    var {data}=this.state;
    return(
      <View style={styles.root}>
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={()=><Separator/>}
        renderItem={({item,index})=><NewItem />}
      />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  root:{
    flex:1
  },
  list:{
    flex:1
  }
})