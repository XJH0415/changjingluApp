import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View, Alert
} from 'react-native';
import Separator from '../components/Separator'

export default class ScrollViewTab extends Component {
  static defaultProps = {
    tabs: [],
    onTabSelect: () => {
    },
  }
  state = {
    selectIndex: 0
  }
  anchor = [];
  renderTab = (item, index) => {
    var {onTabSelect} = this.props;
    var {selectIndex} = this.state;
    var style = StyleSheet.create({
      root: {
        minWidth: 40,
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      select: {
        borderColor: '#75C1AF',
        borderBottomWidth: 3,
      },
      selectText: {
        color: '#75C1AF'
      }
    })

    return (
      <TouchableWithoutFeedback onPress={() => {
        this.setState({
          selectIndex: index
        })
        this.scrollTo(index)
        onTabSelect(item, index,true)
      }} onLayout={(e) => {
        this.anchor[index] = e.nativeEvent.layout
      }}>
        <View style={[style.root, selectIndex === index ? style.select : {}]}>
          <Text style={[style.text, selectIndex === index ? style.selectText : {}]}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  scrollTo(index) {
    var x = this.anchor[index].x;
    var allWidth = this.anchor[this.anchor.length - 1].x + this.anchor[this.anchor.length - 1].width;
    var a=0.65;
    var stopX = this.width * a;
    var {tabs, onTabSelect} = this.props;
    if (x < stopX) {
      x = 0;
    } else {
      x = x - stopX;
    }
    if(allWidth-x<=this.width){
      x=allWidth-(this.width-stopX)-stopX;
    }
    if (x >= 0) {
      this.scrollView.scrollTo({x: x, y: 0, animated: true});
    }
    this.setState({
      selectIndex: index
    })
    onTabSelect(tabs[index], index,false)

  }

  componentWillReceiveProps(props) {
    this.setState({
      isShow: props.isShow
    })
  }

  render() {
    var {tabs} = this.props;
    return (
      <View style={[styles.root]} onLayout={(e) => {
        this.width = e.nativeEvent.layout.width
      }}>
        <ScrollView ref={(view) => {
          this.scrollView = view
        }} style={styles.scrollView} horizontal={true}>
          {tabs.map(this.renderTab)}
        </ScrollView>
        <Separator/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    backgroundColor: '#F5F4F8'
  },
  scrollView: {
    flex: 1
  }
})