import {AsyncStorage} from "react-native";

/**
 * 读取本地存储
 */
function read(){
  AsyncStorage.getItem('object',(error,result)=>{
    if (!error) {
      return result;
    }
  })
};

/**
 * 删除本地存储
 */
function deletes(){
  AsyncStorage.removeItem('object',(error)=>{
    if (error) {
      // alert('删除失败');
    } else  {
      // alert('删除成功');
    }
  });
}
/**
 * 保存本地存储
 */
function save(object){
  console.log('save'+object)
  // JSON.stringify(object): JSON对象转换为字符串 用来存储
  AsyncStorage.setItem('user',object,(error)=>{
    if (error) {
      alert('存储失败');
      console.log('存储失败');
    } else  {
      alert('存储成功');
      console.log('存储成功');
    }
  });
}

export default class LocalStorage{
  static Read(){
    return read();
  }
  static Deletes(){
    return deletes();
  }
  static Save(object){
    return save(object);
  }
}