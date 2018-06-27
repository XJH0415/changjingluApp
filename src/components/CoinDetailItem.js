import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import CoinDetail from '../pages/CoinDetail'

export default class CoinDetailItem extends Component {
  static defaultProps = {
    coinTab: {},
    selectIndex: 0
  }
  state = {
    isReady:true,
    isShow:true
  }

  componentWillReceiveProps(props) {
    if (props.selectIndex - 1 === this.props.index || props.selectIndex === this.props.index || props.selectIndex + 1 === this.props.index) {
      this.setState({
        isReady: true
      })
    } else {
      this.setState({
        isReady: false
      })
    }
    if(props.selectIndex === this.props.index){
      this.setState({
        isShow: true
      })
    }else {
      this.setState({
        isShow: false
      })
    }
  }

  render() {
    var {coinTab} = this.props;
    var {isReady} = this.state;
    return (
      <View style={styles.root}>
        <CoinDetail />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});