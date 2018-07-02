import {Alert} from 'react-native';
const URL = 'https://changjinglu.pro';


export default class DataApi{
  /**
   * 获得代币列表
   * @param page 页码
   * @param sort 排序方式
   * @param currency 计价方式
   * @param callback
   */
  static getCoins(page,sort,currency,callback){
    getData(
      URL+'/app/coins',
      bodyToString({
        page: page,
        sort: sort,
        currency: currency
      }),
      callback);
  }

  /**
   * 搜索
   * @param q 搜索内容
   * @param callback
   */
  static search(q,callback){
    getData(
      URL+'/search',
      bodyToString({
        q:q.toLowerCase()
      }),
      callback);
  }

  /**
   * 获得单个币的header信息
   * @param coin_id 币ID
   * @Param currency 计价方式
   * @param callback
   */
  static getCoinBasic(coin_id,currency,callback){
    getData(
      URL+'/b/basic/'+coin_id,
      bodyToString({
        currency:currency
      }),
      callback);
  }

  /**
   * 获得单个币的Kline
   * @param coin_id 币ID
   * @Param currency 计价方式
   * @param callback
   */
  static getCoinKline(coin_id,currency,callback){
    getData(
      URL+'/b/kline/'+coin_id,
      bodyToString({
        currency:currency
      }),
      callback);
  }

  /**
   * 获得单个币的行情
   * @param coin_id 币ID
   * @Param currency 计价方式
   * @param callback
   */
  static getCoinTicker(coin_id,currency,callback){
    getData(
      URL+'/b/ticker/'+coin_id,
      bodyToString({
        currency:currency
      }),
      callback);
  }
}

function bodyToString(body){
  var bodyString='';
  for(let k of Object.keys(body)){
    bodyString+=k+'='+body[k]+'&'
  }
  bodyString=bodyString.substring(0,bodyString.length-1);
  return bodyString;
}
function getData(URL,bodyString,callback) {
  fetch(URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:bodyString
    })

    .then((response)=>response.json())
    .then((responseJson)=>{
      if(responseJson.no===0){
        callback(responseJson);
      }else {
        Alert.alert(responseJson.msg);
      }
    });
}
