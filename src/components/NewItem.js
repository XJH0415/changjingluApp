import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

export default class NewItem extends Component {
  static defaultProps = {
    title: '标题',
    writer: '作者',
    time: 'yyyy-MM-dd',
    clickRate: '0',
    imtUrl: 'https://changjinglu.pro/uploads/image/d75/9748608565bb208a90001e8b48331b20_390x200.png',
    data:{},
    onPress:()=>{},
  }
  
  render() {
    var {title, writer, time, clickRate, imtUrl,onPress,data} = this.props;
    return (
      <TouchableOpacity onPress={()=>{onPress(data)}} style={styles.container}>
        <Image source={{uri: imtUrl}} style={styles.image} resizeMode='stretch'/>
        <View style={styles.right}>
          <View style={styles.titleForm}>
            <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
          </View>
          <View style={styles.listForm}>
            <View>
              <Text style={[styles.text, styles.time]}>{time}</Text>
            </View>
            <View style={styles.writer}>
              <Text style={[styles.text, styles.writerName]} numberOfLines={1}>{writer}</Text>
            </View>
            <Image source={require('../resource/clickRate.png')} style={styles.clickRateImg} resizeMode='stretch'/>
            <View>
              <Text style={[styles.text, styles.time]}>{clickRate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderBottomColor: '#E6E6FA',
    flexDirection: 'row',
    backgroundColor: 'white'
    
  },
  image: {
    height: 70,
    width: 100,
    margin: 10,
  },
  right: {
    flex: 1,
    margin: 10,
    marginLeft: 0,
  },
  titleForm: {
    height: 45,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
    color:'black'
    
  },
  listForm: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  time: {
    color: '#8F8F8F',
  },
  writer: {
    flex: 1,
    marginLeft: 5,
  },
  clickRateImg: {
    height: 12,
    width: 16,
  },
  writerName: {
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
  },
});
