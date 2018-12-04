import React, { Component } from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  Image,
} from 'react-native';

export default class Loading extends Component {

  state={
    loading:false,
  }

  render() {
    var {loading} = this.state;
    var {coins, userState, selfCoins} =this.props;
    return(
      <View style={styles.root}>
        {
          userState === '0' && coins.length === 0 ?
              <Image style={styles.img} source={require('../resource/loading.png')}/>
            :
            userState === '1' && selfCoins.length === 0 ?
              <Image style={styles.img} source={require('../resource/loading.png')}/>
              :
              null
        }
      </View>
    );
  }

}


const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
  },
  img:{
    width: 30,
    height: 30,
  }
});
