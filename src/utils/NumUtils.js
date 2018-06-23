
export default class NumUtils{
  /**
   * 格式化数字
   * @param num
   * @returns {string}
   */
  static formatNum(num){
    var text=num+'';
    if(num>10000){
      text=(num/10000).toFixed(3)+'万';
    }
    if(num>100000000){
      text=(num/100000000).toFixed(3)+'亿';
    }
    return text;
  }
}