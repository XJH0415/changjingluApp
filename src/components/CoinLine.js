import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native'
import Echarts from 'native-echarts'

export default class CoinLine extends Component {
  state = {
    width: 0,
    height: 0
  }

  render() {
    var {width,height}=this.state;
    var option = {
      backgroundColor:'white',
      // legend: {                                   // 图例配置
      //   padding: 5,                             // 图例内边距，单位px，默认上下左右内边距为5
      //   itemGap: 10,                            // Legend各个item之间的间隔，横向布局时为水平间隔，纵向布局时为纵向间隔
      //   data: ['ios', 'android']
      // },
      tooltip: {                                  // 气泡提示配置
        trigger: 'item',                        // 触发类型，默认数据触发，可选为：'axis'
      },
      xAxis: [                                    // 直角坐标系中横轴数组
        {
          type: 'category',                   // 坐标轴类型，横轴默认为类目轴，数值轴则参考yAxis说明
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      ],
      yAxis: [                                    // 直角坐标系中纵轴数组
        {
          type: 'value',                      // 坐标轴类型，纵轴默认为数值轴，类目轴则参考xAxis说明
          boundaryGap: [0.1, 0.1],            // 坐标轴两端空白策略，数组内数值代表百分比
          splitNumber: 4                      // 数值轴用，分割段数，默认为5
        }
      ],
      series: [
        {
          name: 'ios',                        // 系列名称
          type: 'line',                       // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
          data: [112, 23, 45, 56, 233, 343, 454, 89, 343, 123, 45, 123]
        },
        {
          name: 'android',                    // 系列名称
          type: 'line',                       // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
          data: [45, 123, 145, 526, 233, 343, 44, 829, 33, 123, 45, 13]
        }
      ]
    };
    return (
      <View style={styles.root} onLayout={({nativeEvent}) => {
        this.setState({
          height: nativeEvent.layout.height,
          width: nativeEvent.layout.width
        })
      }}>
        <Echarts option={option} width={width} height={height}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})