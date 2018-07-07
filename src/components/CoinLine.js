import React, {Component} from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native'
import Echarts from '../echarts';
import DateUtils from '../utils/DateUtils'

export default class CoinLine extends Component {
  static defaultProps = {
    lines: {}
  }
  state = {
    width: 0,
    height: 0,
    lines: this.props.lines
  }

  componentWillReceiveProps(props) {
    this.setState({
      lines: props.lines,
    })
  }

  render() {
    var {width, height, lines} = this.state;
    var date = [];
    var data = [];
    for (let time of Object.keys(lines)) {
      var dateStr = DateUtils.Formart(new Date(time * 1000), 'yyyy-MM-dd');
      var num = lines[time] * 1;
      date.push(dateStr);
      data.push(num);
    }

    var option = {
      toolbox: {
        show: false,
      },
      grid: {
        top: 5,
        left: 'left',
        right: 'left'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        splitNumber: 2,
        scale: true,
        boundaryGap: ['10%','10%'],
        axisLabel: {
          inside: true,
          fontSize: 10,
          color: 'gray'
        },
        splitLine:{
          show:false
        }
      },
      dataZoom: [{
        startValue: data.length >= 15 ? data.length - 15 : 0,
        endValue: data.length,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [
        {
          name: '行情数据',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#74C2AF'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#E3F6EF' // 0% 处的颜色
                }, {
                  offset: 1, color: '#74C2AF' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          data: data
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
        {width > 0 && height > 0 ?
            <Echarts option={option} width={width} height={height}/>
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})