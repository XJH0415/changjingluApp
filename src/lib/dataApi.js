import request from 'request'

export default class DataApi{
  getCoins(body,callback){
    request(
      {
        url: 'https://changjinglu.info/app/coins',
        method: "POST",
        json: true,
        body:body
      },
      function (error, response, body) {
        if(body&&body.no===0){
          callback(body)
        }else {
          console.log(body.msg)
        }
      });
  }
}
