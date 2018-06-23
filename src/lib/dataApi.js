
const URL = 'https://changjinglu.info'

export default class DataApi{
  static getCoins(body,callback){
    var path='/app/coins';
    fetch(URL+path,{method: "POST",body:JSON.stringify(body)})
      .then((response)=>response.json())
      .then((responseJson)=>{
        callback(responseJson)
    });
  }
}
