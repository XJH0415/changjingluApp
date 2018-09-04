import {Alert, AsyncStorage} from 'react-native';

const URL = 'https://changjinglu.pro';


export default class DataApi {
  /**
   * 获得代币列表
   * @param page 页码
   * @param sort 排序方式
   * @param currency 计价方式
   * @param callback
   */
  static getCoins(page, sort, currency, callback) {
    getData(
      URL + '/app/coins',
      bodyToString({
        page: page,
        sort: sort,
        currency: currency
      }),
      callback);
  }
  
  /**
   * 根据id集合获得代币列表
   * @param code_ids id集合
   * @param page 页码
   * @param sort 排序方式
   * @param currency 计价方式
   * @param callback
   */
  static getCoinsByCoin_Ids(code_ids, page, sort, currency, callback) {
    getData(
      URL + '/app/coins',
      bodyToString({
        coin_ids: code_ids,
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
  static search(q, callback) {
    getData(
      URL + '/search',
      bodyToString({
        q: q.toLowerCase()
      }),
      callback);
  }
  
  /**
   * 获得单个币的header信息
   * @param coin_id 币ID
   * @Param currency 计价方式
   * @param callback
   */
  static getCoinBasic(coin_id, currency, callback) {
    getData(
      URL + '/b/basic/' + coin_id,
      bodyToString({
        currency: currency
      }),
      callback);
  }
  
  /**
   * 获得单个币的Kline
   * @param coin_id 币ID
   * @Param currency 计价方式
   * @param callback
   */
  static getCoinKline(coin_id, currency, callback) {
    getData(
      URL + '/b/kline/' + coin_id,
      bodyToString({
        currency: currency
      }),
      callback);
  }
  
  /**
   * 获得单个币的行情
   * @param coin_id 币ID
   * @Param currency 计价方式
   * @param callback
   */
  static getCoinTicker(coin_id, currency, callback) {
    getData(
      URL + '/b/ticker/' + coin_id,
      bodyToString({
        currency: currency
      }),
      callback);
  }
  
  /**
   * 根据ids获得Kline
   * @param coin_ids id集合，此处为字符串格式，非数组
   * @param currency 计价方式
   * @param callback
   */
  static getKlines(coin_ids, currency, callback) {
    getData(
      URL + '/b/klines',
      bodyToString({
        codes: coin_ids,
        currency: currency
      }),
      callback);
  }
  
  /**
   * 获得咨询类别
   * @param callback
   */
  static getNewsBar(callback) {
    getData(
      URL + '/app/newsBar',
      bodyToString({}),
      callback);
  }
  
  /**
   * 获得资讯列表
   * @param type 类型(例:price / bigv / ...BTC/1ST)
   * @param page 页码
   * @param sort 排序
   * @param rich 网页信息读取 rich:0 则 content=""
   * @param callback
   */
  static getNewsPlain(type, page, sort, rich, callback) {
    getData(
      URL + '/app/newsPlain',
      bodyToString({
        type: type,
        page: page,
        sort: sort,
        rich: rich
      }),
      callback);
  }
  
  /**
   * 根据代币id获得代币相关专栏文章
   * @param coin_id
   * @param page
   * @param callback
   */
  static getCoinArticles(coin_id, page, callback) {
    getData(
      URL + '/app/coinArticles',
      bodyToString({
        coin_id: coin_id,
        page: page
      }),
      callback);
  }
  
  /**
   * 获取交易所列表
   * @param page
   * @param sort
   * @param callback
   */
  static getSiteAll(page, sort, callback) {
    getData(
      URL + '/app/siteAll',
      bodyToString({
        page: page,
        sort: sort
      }),
      callback);
  }
  
  /**
   * 交易所ID集合精确获取交易所信息
   * @param site_id
   * @param callback
   */
  static getSitePlain(site_id, callback) {
    getData(
      URL + '/app/sitePlain',
      bodyToString({
        site_id: site_id
      }),
      callback);
  }
  
  /**
   * 通过交易所ID集合精确获取交易所列表交易对
   * @param site_id
   * @param callback
   */
  static getSiteRich(site_id, callback) {
    getData(
      URL + '/app/siteRich',
      bodyToString({
        site_id: site_id
      }),
      callback);
  }
  
  /**
   * 获取评论
   * @param type
   * @param id
   * @param page
   * @param callback
   */
  static getComment(type, id, page, callback) {
    getData(
      URL + '/comment/get',
      bodyToString({
        type: type,
        id: id,
        page: page,
      }),
      callback);
  }
  
  
  static test(){
    fetch('https://changjinglu.pro/me',
      {
        method: 'get',
      })
      .then((response) => response)
      .then((responseJson) => {
        console.log(responseJson)
      });
  }

  /**
   * 登录
   * @param phone 手机号
   * @param password 密码
   * @param callback 返回 true/false
   */
  static getLogin(phone, password, callback) {
    getData(
      URL + '/app/login',
      bodyToString({
        phone: phone,
        password: password,
      }),
      callback);
  }

  /**
   * 发送手机短信
   * @param phone
   * @param callback
   */
  static getSms(phone, callback) {
    getData(
      URL + '/app/sms',
      bodyToString({
        phone: phone,
      }),
      callback);
  }

  /**
   * 注册
   * @param name
   * @param phone
   * @param password
   * @param sms
   * @param callback
   */
  static getRegister(name, phone, password, sms, callback) {
    getData(
      URL + '/app/signup',
      bodyToString({
        name: name,
        phone: phone,
        password: password,
        sms: sms,
      }),
      callback);
  }

}

function bodyToString(body) {
  var bodyString = '';
  for (let k of Object.keys(body)) {
    if (Array.isArray(body[k])) {
      for (let value of body[k]) {
        bodyString += k + '[]=' + value + '&'
      }
    } else {
      bodyString += k + '=' + body[k] + '&'
    }
  }
  bodyString = bodyString.substring(0, bodyString.length - 1);
  return bodyString;
}


function getData(URL, bodyString, callback) {
  var key = URL + '?' + bodyString;
  readData(key,callback,()=>{
    fetch(URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyString
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.no === 0) {
          callback(responseJson.data);
          save(key,responseJson.data)
        } else {
          Alert.alert('msg:' + responseJson.msg);
        }
      });
  })
}

function readData(key, callback, fetch) {
  AsyncStorage.getItem(key, (error, result) => {
    if (error) {
      console.log('read:' + error)
    }
    if(result){
      callback(JSON.parse(result));
    }
    fetch();
  })
}

function save(key, value) {
  AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
    if (error) {
      console.log('save:' + error)
    }
  })
}
