import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';

export  default class CodeItem extends Component {
  static defaultProps={
    data:{
      id:1,
      code:'BTC',
      name_cn:'比特币',
      name_en:'bitcoin',
      price:40005.254,
      value:12345.1245,
      vol:12045.254,
      change:0.05124,
    }
  }
  
  render() {
    var {data:{id,code,name_en,name_cn,price,vol,change,value}}=this.props;
    return (
      <View style={styles.root}>
        <View style={styles.imgView}>
          <Image style={styles.img} />
        </View>
        
        <View style={styles.codeView}>
          <View style={styles.name}>
            <Text style={styles.codeName}>{code}</Text>
            <Text style={styles.name_cn_en}>({name_cn?name_cn:name_en})</Text>
          </View>
          <View >
            <Text style={styles.vol}>成交量:{vol.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.priceView}>
          <View >
            <Text style={[styles.price,change>0?{color:'red'}:{color:'green'}]}>价格:{price.toFixed(2)}</Text>
          </View>
          <View >
            <Text style={styles.value}>市值:{value.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.changeView}>
          <Text style={change>0?{color:'red'}:{color:'green'}}>{(change*100).toFixed(2)}%</Text>
        </View>
      </View>
    );
  }
   
}

const styles=StyleSheet.create({  
    root:{
      marginLeft:5,
      marginRight:5,
      height:40,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },  
    imgView:{  
      width:40,
      height:40,
    },
    img:{
      
    },
    codeView:{  
      flexDirection:'column',
    },
    name:{  
      flexDirection:'row',
    },
    codeName:{
      fontWeight:'bold',
    },
    name_cn_en:{
      color:'#8F8F8F',
    },
    vol:{  
      
    },
    priceView:{  
      flex:1,
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'flex-end',
    },
    price:{ 
      
    },
    value:{ 
      
    },
    changeView:{
      margin:5,
    },
});  