import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1. 安装插件
Vue.use(VueRouter)

// 2. 创建路由对象
// 配置路由映射
const routes = [
  {
    // 默认进来的时候地址为空 然后显示主页
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
]

const router = new VueRouter({
  routes,
  // 路径显示变成html5 history模式
  mode: 'history'
})



// 3. 导出路由
export default router