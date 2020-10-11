import axios from 'axios'

export default function ajax(url = '', params = {}, type = 'GET') {
  //定义promise对象
  let promise
  return new Promise((resolve, reject) => {
    //GET请求
    if ('GET' === type) {
      //拼接请求字符串
      let paramsStr = ''
      //返回一个由一个给定对象的自身可枚举属性组成的数组
      Object.keys(params).forEach(item => {
        paramsStr += item + '=' + params[item] + '&'
      });
      //去除最后的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      //完整路径
      url += '?' + paramsStr
      //发送请求
      promise = axios.get(url)
    } else if ('POST' === type) {
      promise = axios.post(url, params)
    }
    //返回结果
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
