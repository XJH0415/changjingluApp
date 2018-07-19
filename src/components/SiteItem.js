import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class SiteItem extends Component{
  static defaultProps={
    site:{},
    onPress:()=>{}
  }
  
  _renderStar(star){
    var attr=[];
    for(var i=0;i<5;i++){
      if(i<star){
        attr.push(<Image style={styles.starImage} key={i+''} source={require('../resource/star.png')}/>)
      }else {
        attr.push(<Image style={styles.starImage} key={i+''} source={require('../resource/star1.png')}/>)
      }
    }
    return attr;
  }
  render(){
    var {site,site:{icon,name_cn,star,country_cn},onPress}=this.props
    return(
      <TouchableOpacity style={styles.root} onPress={()=>onPress(site)}>
        <Image style={styles.image} source={icon?{uri: icon}:require('../resource/star1.png')}/>
        <View style={styles.view}>
          <View style={styles.topView}>
            <Text style={styles.title}>{name_cn}</Text>
            <View style={styles.star}>
              {this._renderStar(star===0?0:star).map((item,index)=>{
                return item;
              })}
            </View>
          </View>
          <Text style={styles.bottomText}>国家:{country_cn}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles=StyleSheet.create({
  root:{
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    backgroundColor:'white',
  },
  image:{
    height:50,
    width:50,
  },
  view:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
    marginLeft:5
  },
  topView:{
    height:30,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  bottomText:{
    height:20,
    fontSize:12,
    color:'gray'
  },
  title:{
    flex:1,
    fontSize:18,
    color:'black'
  },
  star:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  starImage:{
    height:20,
    width:20
  }
  
})