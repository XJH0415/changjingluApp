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
   * 登出
   */
  static getLogOut() {
    getData(
      URL + '/app/logout',
      bodyToString({}),
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


  /**
   * 根据id获取---猜涨跌
   * @param id
   * @param callback
   */
  static getGuessRF(id, callback) {
    getData(
      URL + '/app/viewBet',
      bodyToString({
        id: id,
      }),
      callback);
  }

  /**
   * 修改密码
   * @param oldcode
   * @param newcode
   */
  static getOnChangePassword(oldcode, newcode) {
    let formData = new FormData();
    formData.append("oldcode", oldcode);
    formData.append("newcode", newcode);
    formData.append("newcode2", newcode);
    console.log('formData', formData);
    //'oldcode='+oldcode+'&newcode='+newcode+'newcode2='+newcode
    fetch(URL + '/password',{
      method:'POST',
      headers:{
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        "Content-Type": "multipart/form-data;charset=utf-8"
      },
      body: formData
    })
    // .then((response) => response.json())
      .then((responseData)=>{
        !responseData.url.indexOf('error') ? alert('修改成功') : alert('修改失败')
        console.log('responseData=', responseData);
      })
      .catch((error)=>{
        console.error('error=', error)
      });
  }

  /**
   * 更换头像
   */
  static getUploadImage(uri, name){
    console.log('uri', uri);
    let formData = new FormData();
    let file = { uri: uri, type: 'multipart/form-data', name: name};
    formData.append("avatar", file);
    console.log('formData', formData);
    fetch(URL + '/avatar',{
      method:'POST',
      headers:{
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Content-Type':'multipart/form-data',
      },
      body:formData,
    })
    // .then((response) => response.json())
      .then((responseData)=>{
        alert('文件上传成功!');
        console.log('responseData=', responseData);
      })
      .catch((error)=>{
        console.error('error=', error)
      });
  }



  /**
   * 积分记录
   * @param page
   * @returns {Promise<any> | Promise}异步
   */
  static getIntegralRecord(page) {
    var url = URL + '/app/points';
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(page)
      })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
  }

  /**
   * 猜涨跌记录
   * @param page
   * @returns {Promise<any> | Promise}
   */
  static getGuessRecord(page) {
    var url = URL + '/app/bets';
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(page)
      })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
  }

  /**
   * 收藏的文章
   * @param page
   * @returns {Promise<any> | Promise}
   */
  static getCollectionArticles(page) {
    var url = URL + '/app/favArticle';
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(page)
      })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
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
  var key = null;
    if (!bodyString) {
    key = URL;
  }else{
    key = URL + '?' + bodyString;
  }
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
          console.log('msg:' + responseJson.msg);
        }
      }).catch((error) => {
        console.error(error);
      });
  })
}

function readData(key, callback, fetch) {
  AsyncStorage.getItem(key, (error, result) => {
    if (error) {
      console.log('read:' + error)
      alert(error)
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

