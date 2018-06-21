import request from 'request'

const URL = 'https://changjinglu.info'

export default class DataApi{
  static getCoins(body,callback){
    var path='/app/coins';
    request(
      {
        url: URL+path,
        method: "POST",
        json: true,
        body:body
      },
      function (error, response, body) {
        if(body&&body.no===0){
          callback(body)
        }else {
          console.error('error:'+error)
          console.error('response:'+response?response.statusCode:body)
          console.error('body:'+body?body.msg:body)
        }
      });
  }
}
