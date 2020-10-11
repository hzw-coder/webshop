// 过滤器
import Vue from 'vue'

//人民币过滤器
Vue.filter('moneyFormat', value => {
  return '￥' + Number(value).toFixed(2)
})
//账号过滤器
Vue.filter('nameFormat', name => {
  //转化为数组
  let nameArr = [...name]
  //遍历
  let str = ''
  //判断是否为手机号码
  if (/^[1][3,4,5,7,8][0-9]{9}$/.test(name)) {
    nameArr.forEach((item, index) => {
      if (index === 3 || index === 4 || index === 5 || index === 6) {
        str += '*'
      } else {
        str += item
      }
    })
  } else {
    nameArr.forEach((item, index) => {
      if (index != 0 && index != nameArr.length - 1) {
        str += '*'
      } else {
        str += item
      }
    })
  }
  return str
})
