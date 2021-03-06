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
        // console.log(responseJson)
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
   * 登出
   */
  static logOut() {
    fetch(URL+'/app/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {}
    })
      .then(response => response.json())
      .then(result => resolve(result))
  }


  /**
   * 修改密码
   * @param oldcode
   * @param newcode
   */
  static changePassword(oldcode, newcode) {
    let formData = new FormData();
    formData.append("oldcode", oldcode);
    formData.append("newcode", newcode);
    formData.append("newcode2", newcode);
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
      })
      .catch((error)=>{
        // console.log('error=', error)
      });
  }

  /**
   * 更换头像
   */
  static uploadImage(uri, name){
    let formData = new FormData();
    let file = { uri: uri, type: 'multipart/form-data', name: name};
    formData.append("avatar", file);
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
        // console.log('responseData=', responseData);
      })
      .catch((error)=>{
        // console.log('error=', error)
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

  /**
   * 发布评论
   * @param type
   * @param id
   * @param content
   * @param score
   * @param callback
   * @constructor
   */
  static CommentAdd(type, id, content, score, callback){
    var url = URL + '/comment/add';
    getData(
      url,
      bodyToString({
        type: type,
        id: id,
        content: content,
        score: score,
      }),
      callback);
  }

  /**
   * 评论回复
   * @param comment_id
   * @param content
   * @param callback
   * @constructor
   */
  static CommentReply(comment_id, content, callback){
    var url = URL + '/comment/reply/'+comment_id;
    getData(
      url,
      bodyToString({
        content: content,
      }),
      callback);
  }

  /**
   * 打赏
   * @param comment_id
   * @param tips
   * @param callback
   * @constructor
   */
  static CommentTips(comment_id, tips, callback, errorCallback){
    var url = URL + '/comment/tips/'+comment_id;
    getData(
      url,
      bodyToString({
        tips: tips,
      }),
      callback,errorCallback);
  }

  /**
   * 点赞
   * @param comment_id
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static CommentLike(comment_id, callback, errorCallback){
    var url = URL + '/comment/like/'+comment_id;
    getData(
      url,
      bodyToString({

      }),
      callback,errorCallback);
  }

  static SaveMsg(key,obj){
    save(key,obj);
  }

  /**
   * 胡扯
   * @param comment_id
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static CommentDisLike(comment_id, callback, errorCallback){
    var url = URL + '/comment/dislike/'+comment_id;
    getData(
      url,
      bodyToString({

      }),
      callback,errorCallback);
  }

  /**
   * 广告位招租
   */
  static getAdsInfo(callback, errorCallback){
    var url = URL + '/app/adsInfo';
    getData(
      url,
      bodyToString({
      }),
      callback, errorCallback);
  }


  /**
   * 获取所有当天猜涨跌数据
   */
  static getBetActive(callback){
    var url = URL + '/app/betActive';
    getData(
      url,
      bodyToString({}),
      callback);
  }

  /**
   * 根据coin_bet_id获取---猜涨跌数据
   * @param coin_bet_id
   * @param callback
   */
  static getGuessRF(coin_bet_id, callback) {
    getData(
      URL + '/app/viewBet',
      bodyToString({
        id: coin_bet_id,
      }),
      callback);
  }

  /**
   * 根据coin_id获取当前币的猜涨跌历史记录
   * @param coin_id
   * @param callback
   */
  static getHistoryBets(coin_id, callback) {
    getData(
      URL + '/app/viewBet',
      bodyToString({
        coin_id: coin_id,
      }),
      callback);
  }

  /**
   * 根据coin_bet_id
   * 获取---当前用户猜涨跌数据
   * 以及所有参与本次猜涨跌的记录
   * @param coin_bet_id
   * @param callback
   */
  static getCurrentBets(coin_bet_id, callback) {
    getData(
      URL + '/app/getBet',
      bodyToString({
        id: coin_bet_id,
      }),
      callback);
  }

  /**
   * 猜涨跌--我要竞猜
   * @param id 猜涨跌期数coin_bet_id
   * @param type
   * @param bet 猜的数值
   * @param callback
   * @param errorCallback
   */
  static AddBet(id, type, bet, callback, errorCallback) {
    SubmitForm(
      URL + '/app/addBet',
      bodyToString({
        id: id,
        type: type,
        bet: bet+''
      }),
      callback, errorCallback);
  }

  /**
   * 文章收藏
   * @param article_id
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static ArticleLike(article_id, callback, errorCallback){
    var url = URL + '/article/like/'+article_id;
    getData(
      url,
      bodyToString({
      }),
      callback,errorCallback);
  }

  /**
   * 文章取消收藏
   * @param article_id
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static ArticleUnLike(article_id, callback, errorCallback){
    var url = URL + '/article/unlike/'+article_id;
    getData(
      url,
      bodyToString({
      }),
      callback,errorCallback);
  }

  /**
   * 文章打赏功能
   * @param article_id
   * @param tips
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static ArticleTips(article_id, tips, callback, errorCallback){
    var url = URL + '/article/tips/'+article_id;
    getData(
      url,
      bodyToString({
        tips: tips
      }),
      callback,errorCallback);
  }

  /**
   * 我的自选---币
   * @param page
   * @param sort
   * @param callback
   * @param errorCallback
   */
  static getSelfSelect(page, sort, callback, errorCallback){
    var url = URL + '/app/selfSelect';
    SubmitForm(
      url,
      bodyToString({
        page: page,
        sort: sort
      }),
      callback,errorCallback);
  }

  /**
   * 我的自选---交易所
   * @param page
   * @param sort
   * @param callback
   * @param errorCallback
   */
  static getMeTickers(page, sort, callback, errorCallback){
    var url = URL + '/me/tickers';
    SubmitForm(
      url,
      bodyToString({
        page: page,
        sort: sort
      }),
      callback,errorCallback);
  }

  /**
   * 单币加入自选
   * @param coin_id
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static AddCoinWatch(coin_id, callback, errorCallback){
    var url = URL + '/coin/watch';
    SubmitForm(
      url,
      bodyToString({
        coin_id: coin_id
      }),
      callback,errorCallback);
  }

  /**
   * 单币取消自选
   * @param coin_id
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static RemoveCoinWatch(coin_id, callback, errorCallback){
    var url = URL + '/coin/unwatch';
    SubmitForm(
      url,
      bodyToString({
        coin_id: coin_id
      }),
      callback,errorCallback);
  }

  /**
   * 交易对加入自选
   * @param site_id
   * @param ticker
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static AddPairsWatch(site_id, ticker, callback, errorCallback){
    var url = URL + '/ticker/watch';
    SubmitForm(
      url,
      bodyToString({
        site_id: site_id,
        ticker: ticker
      }),
      callback,errorCallback);
  }

  /**
   * 交易对取消自选
   * @param site_id
   * @param ticker
   * @param callback
   * @param errorCallback
   * @constructor
   */
  static RemovePairsWatch(site_id, ticker, callback, errorCallback){
    var url = URL + '/ticker/unwatch';
    SubmitForm(
      url,
      bodyToString({
        site_id: site_id,
        ticker: ticker
      }),
      callback,errorCallback);
  }

  /**
   * 刷新用户信息
   * @param callback
   */
  static getLogMe(callback){
    var url = URL + '/app/logMe';
    SubmitForm(
      url,
      bodyToString({
      }),
      callback);
  }

  /**
   * 通过cookie
   * 刷新用户信息
   * @param callback
   */
  static getCookieLogMe(callback){
    var url = URL + '/app/logMe';
    getCookieMsg(
      url,
      bodyToString({
      }),
      callback);
  }

  /**
   * 精确获取代币描述
   * @param coin_id
   * @param callback
   * @param errorCallback
   */
  static getCoinDetails(coin_id, callback, errorCallback){
    var url = URL + '/app/coinDetails';
    getData(
      url,
      bodyToString({
        coin_id: coin_id
      }),
      callback,errorCallback);
  }

  /**
   * KYC身份验证
   * @param image
   */
  static Authentication(image,imageName){
    return new Promise(function (resolve, reject) {
      var url = 'https://api-cn.faceplusplus.com/cardpp/v1/ocridcard';
      let formData = new FormData();
      let file = {uri: image, type: 'multipart/form-data', name: imageName};
      formData.append("image_file", file);
      formData.append("image_url", '');
      formData.append("image_base64", '');
      formData.append("api_key", "sqMkoDhSaMAjyz8Z3nG3eOog_J7h_pGZ");
      formData.append("api_secret", "AOGcYO53kQoy6OPcEyh0MsCQpg1aY2wr");
      formData.append("legality", "1");
      fetch(url, {
        method:'POST',
        headers:{
          'Content-Type':"multipart/form-data;charset=UTF-8",
          // 'Cookie': getCookie(),
        },
        body:formData,
      }).then((response) => response.json())
        .then((responseData)=> resolve(responseData))
        .catch((err)=> reject(err));
    })
  }


  static getMsg(key,callback){
    readData(key, callback,()=>{});
  }

  static removeMsg(key,callback){
    removeData(key, callback,()=>{});
  }

}

function getCookie() {
  DataApi.getMsg('Cookie', (cookie)=>{
    if (cookie){
      return cookie;
    }
  });
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


function getData(URL, bodyString, callback, errorCallback) {
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
          'Accept': 'application/json',
        },
        body: bodyString
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // if (JSON.stringify(responseJson).indexOf('<')!==-1){
        //   console.log(URL)
        // }
        if (responseJson.no === 0) {
          callback(responseJson.data);
          save(key,responseJson.data)
        } else {
          if (errorCallback){
            errorCallback(responseJson.msg)
          }
        }
      }).catch((error) => {
        // console.log(error);
      });
  })
}

function readData(key, callback, fetch) {
  AsyncStorage.getItem(key, (error, result) => {
    if (error) {
      // console.log('read:' + error)
      alert(error)
    }
    if(result){
      callback(JSON.parse(result));
    }
    fetch();
  })
}

function save(key, value) {
  if(key&&value){
    AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
      if (error) {
        // console.log('save:' + error)
      }
    })
  }
}

function removeData(key, callback) {
  AsyncStorage.removeItem(key, (error) => {
    if (error) {
      // console.log('remove:' + error)
    }else {
      callback(true)
    }
  })
}

function SubmitForm(URL, bodyString, callback, errorCallback) {
  fetch(URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: bodyString
    })
    .then((response) =>  {
      if(response.status!==500){
        return response.json()
      }
    })
    .then((responseJson) => {
    
      // if (JSON.stringify(responseJson).indexOf('<')!==-1){
      //   console.log(URL)
      // }
      // alert(JSON.stringify(responseJson))
      if (responseJson.no === 0) {
        callback(responseJson.data);
      } else {
        if (errorCallback){
          errorCallback(responseJson.msg)
        }
      }
    }).catch((error) => {
    // console.log(error);
  });
}

function getCookieMsg(URL, bodyString, callback, errorCallback) {
  fetch(URL,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        // 'Cookie': getCookie(),
        // 'Connection': 'keep-alive',
        // 'Upgrade-Insecure-Requests': '1',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
      },
      body: bodyString
    })
    .then((response) =>  {
      if(response.status!==500){
        return response.json()
      }
    })
    .then((responseJson) => {

      // if (JSON.stringify(responseJson).indexOf('<')!==-1){
      //   console.log(URL)
      // }
      // alert(JSON.stringify(responseJson))
      if (responseJson.no === 0) {
        callback(responseJson.data);
      } else {
        if (errorCallback){
          errorCallback(responseJson.msg)
        }
      }
    }).catch((error) => {
    // console.log(error);
  });
}