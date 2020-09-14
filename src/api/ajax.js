/*
ajax 请求函数
返回值：promise 对象(异步返回的数据是 response.data)
 */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步 ajax 请求
    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符
      // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
      // 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
      // Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        // substring() 方法返回一个字符串在开始索引到结束索引(不包括结束索引)之间的一个子集
        // lastIndexOf() 方法返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功调用 resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失败调用 reject()
      reject(error)
    })
  })

}
