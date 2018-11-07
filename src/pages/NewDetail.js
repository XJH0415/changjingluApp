import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  FlatList,
  WebView, Platform, BackAndroid,
  PixelRatio,
} from 'react-native';
import DateUtils from '../utils/DateUtils';
import API from '../lib/dataApi';
import CommentItem from '../components/CommentItem';
import Comment from "./Comment";
import CollectionRewardItem from "../components/CollectionRewardItem";
import PropTypes from "prop-types";



export default class NewDetail extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '币说';
    if (navigation) {
      data = navigation.state.params.data
      if (data) {
        headerTitle = data.title
      }
    }
    return {
      headerTitle: headerTitle
    }
  };

  static contextTypes={
    userState: PropTypes.string,
    userMsg: PropTypes.string,
    coins: PropTypes.array,
    selfCoins: PropTypes.array,
    selfCoinsString: PropTypes.any,
    myTicker: PropTypes.array,
    myTickerString: PropTypes.any,
    setContextState: PropTypes.func,
    getContextState: PropTypes.func,
  }

  state={
    height:0,
    userMsg: this.context.getContextState().userMsg,
    userState: this.context.getContextState().userState,
  }

  render() {
    var {navigation} = this.props;
    var {navigate} = navigation;
    var data =navigation ? navigation.state.params.data : null
    var {title, summary, add_time, views, content} = data;
    var name = data.author && data.author.name ? data.author.name : data.columnist&&data.columnist.name ? data.columnist.name : data.poster.name;
    return (
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.headerBottom}>
            <View style={{flex: 1}}><Text style={[styles.text, {color: 'black'}]}>{name}</Text></View>
            <View><Text
              style={styles.text}>{DateUtils.Formart(new Date(add_time * 1000), 'yyyy-MM-dd hh:mm')}</Text></View>
            <View><Text style={styles.text}>{views}</Text></View>
          </View>
        </View>
        <View style={styles.summary}>
          <Text style={styles.text}>{summary}</Text>
        </View>
        <View style={{height: this.state.height}}>
          <WebView
            source={{
              html: `<!DOCTYPE html>
                    <html>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                    <script src="https://changjinglu.pro/asset/script/jquery.js?12"></script>
                    <body>
                    <div id="main">
                    ${content}
                    </div>
                    <script type="text/javascript">
                        var IMG_SIZES = {};
                        function resizeImages() {
                          var ww = $('#main').width();
                          $('#main img').each(function(i, j) {
                            j = $(j);
                            var url = j.attr('src');
                            if (IMG_SIZES[url]) {
                              var w = IMG_SIZES[url].width;
                              var h = IMG_SIZES[url].height;
                              if (!w || !h) return;
                              if (w <= ww) {
                                j.css({width:w, height:h});
                              } else {
                                j.css({width:ww, height:h*ww/w});
                              }
                            }
                          });
                        }
                        $(window).resize(resizeImages);
                        
                        $('#main img').each(function(i, j) {
                          j = $(j);
                          var url = j.attr('src');
                          if (IMG_SIZES[url] !== undefined) return;
                          IMG_SIZES[url] = false;
                          var img = new Image();
                          img.onload = function() {
                            IMG_SIZES[$(this).attr('src')] = {width:this.width, height:this.height};
                            resizeImages();
                          };
                          img.src = url;
                        });
                        window.onload=function(){window.location.hash = 1;document.title = document.getElementById('main').offsetHeight;}
                        var wrapper = document.createElement("div");
                        wrapper.id = "height-wrapper";
                        while (document.body.firstChild) {
                            wrapper.appendChild(document.body.firstChild);
                        }
                        document.body.appendChild(wrapper);
                        var i = 0;
                        function updateHeight() {
                            document.title = wrapper.clientHeight;
                            window.location.hash = ++i;
                        }
                        updateHeight();
                        window.addEventListener("load", function() {
                            updateHeight();
                            setTimeout(updateHeight, 1000);
                        });
                        window.addEventListener("resize", updateHeight);
                    </script>
                    </body>
                    </html>`
            , baseUrl: ''}}
            style={{height: this.state.height}}
            bounces={false}
            scalesPageToFit={false}
            scrollEnabled={false}
            automaticallyAdjustContentInsets={true}
            contentInset={{top: 0, left: 0}}
            onNavigationStateChange={(title) => {
              // alert(title.title+':'+PixelRatio.roundToNearestPixel(parseInt(title.title)+10))
              if (title.title !== undefined) {
                this.setState({
                  height: (parseInt(title.title)+20)
                })
              }
            }}
          >
          </WebView>
        </View>

        {
          this.context.getContextState().userState === '1' ?
            <View>
              <CollectionRewardItem data={data} />
              <Comment data={data} type={'article'}/>
            </View>
            :
            <View
              // onPress={() => {navigate('Index.User', {})}}
              style={{margin: 20,}}>
              <Text style={{fontSize: 16,}}>登录后您可以评论</Text>
            </View>
        }
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding:10
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black'
  },
  text: {
    color: '#8F8F8F',
    margin: 5
  },
  summary: {
    backgroundColor: 'rgb(238,238,238)',
    margin: 5
  },
  webView: {
    width: 300,
  }
})