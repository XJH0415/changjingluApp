import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default class Header extends Component {
  static defaultProps = {
    onSelect: () => {
    },
    btns: ['COIN', '排行榜']
  }
  state = {
    headerSelect: 0
  }

  render() {
    var {headerSelect} = this.state;
    var {onSelect, btns} = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.headerView}>
          <TouchableWithoutFeedback onPress={() => {
            this.setState({headerSelect: 0});
            onSelect(0)
          }}>
            <View style={[styles.headerBtn1, headerSelect === 0 ? {backgroundColor: '#75C1AF'} : {}]}>
              <Text style={styles.headerText}>{btns[0]}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            this.setState({headerSelect: 1});
            onSelect(1)
          }}>
            <View style={[styles.headerBtn2, headerSelect === 1 ? {backgroundColor: '#75C1AF'} : {}]}>
              <Text style={styles.headerText}>{btns[1]}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171B35'
  },
  headerView: {
    width: 150,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerBtn1: {
    borderColor: '#75C1AF',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 2,
    borderRightWidth: 0,
    flex: 1,
  },
  headerBtn2: {
    borderColor: '#75C1AF',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    borderLeftWidth: 0,
    flex: 1,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: 'bold',
    color: 'white'
  }
})