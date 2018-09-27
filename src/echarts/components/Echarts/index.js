import React, { Component } from 'react';
import { WebView, View, StyleSheet,Platform} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    var source = require('./tpl.html');
    if(__DEV__){
      source = require('./tpl.html')
    }else if(Platform.OS==='android'){
      source={uri: 'file:///android_asset/echarts/tpl.html'}
    }
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          javaScriptEnabled={true}
          domStorageEnabled = {true}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.option.backgroundColor || 'rgba(0, 0, 0, 0)'
          }}
          scalesPageToFit={false}
          source={source}
          // onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
