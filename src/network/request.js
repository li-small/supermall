import axios from 'axios'

// 拦截器
export function request(config) {
  // 1. 创建axios实例
  const instance1 = axios.create({
    baseURL: '',  // 需要接口可以去找coderwhy老师
    timeout: 2000
  })

  // 2. axios的拦截器
  // 2.1 请求拦截
  // 请求拦截成功来到config 请求失败来到err
  instance1.interceptors.request.use(config => {
    // 拦截完数据 处理完要返回给其他地方使用
    return config
  }, err => {
    return err
  })

  // 2.2 响应拦截
  instance1.interceptors.response.use(res => {
    // 拦截完数据 处理完要返回给其他地方使用
    return res.data
  }, err => {
    return err
  })

  // 3. 发送真正的网络请求 返回的是promise
  return instance1(config)
}