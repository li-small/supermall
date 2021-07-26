import { request } from './request'

// 首页请求的数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 切换类型栏模块请求的数据
export function getHomeGoods(type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}