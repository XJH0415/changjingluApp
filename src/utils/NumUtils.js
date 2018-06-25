
export default class NumUtils{
  /**
   * 格式化数字
   * @param num
   * @returns {string}
   */
  static formatNum(num){
    num=num*1;
    var text=num+'';
    if(num>0){
      text=(num).toFixed(3)
    }
    if(num>1){
      text=(num/1).toFixed(3)
    }
    if(num>10000){
      text=(num/10000).toFixed(3)+'万';
    }
    if(num>100000000){
      text=(num/100000000).toFixed(3)+'亿';
    }
    return text;
  }
}