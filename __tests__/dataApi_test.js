import API from '../src/lib/dataApi'


test('API.getCoins',()=>{
  expect(API.getCoins({
    page:1,
    sort:'va',
    currency:'usd'
  },(body)=>{
    if(body){
      console.log('数据获取成功！')
    }
  }))
})