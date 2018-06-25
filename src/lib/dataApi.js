import {Alert} from 'react-native';
const URL = 'https://changjinglu.info'

export default class DataApi{
  static getCoins(body,callback){
    var path='/app/coins';
    var bodyString='';
    for(let k of Object.keys(body)){
      bodyString+=k+'='+body[k]+'&'
    }
    bodyString=bodyString.substring(0,bodyString.length-1);
    fetch(URL+path,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:bodyString
      })

      .then((response)=>response.json())
      .then((responseJson)=>{
        callback(responseJson)
    });
  }
}
