import React, { Component } from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  Modal,
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
              <Text>正在载入。。。</Text>
            :
            userState === '1' && selfCoins.length === 0 ?
              <Text>正在载入。。。</Text>
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
  }
});
