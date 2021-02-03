/**
 * Created by 垃圾桶.
 * Date: 2021-1-27
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 导入图标样式
import './assets/fonts/iconfont.css'
// 导入element-ui
import '@/plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// 导入全局样式
import '@/assets/css/global.css'
// 对axios进行全局配置
import axios from 'axios'
// 导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'nprogress/nprogress'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// 让ajax携带cookie
// axios.defaults.withCredentials = true
// 配置请求根路径
axios.defaults.baseURL = 'https://df5c6f5b-e47c-4657-aeb9-f981a2503217.mock.pstmn.io'
// 设置默认头部
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
// axios请求拦截
// axios.interceptors.request.use(config => {
//   // console.log(config)
//   // 为请求头对象，添加Token验证的Authorization字段
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 必须在最后返回config
//   return config
// })
// 挂载到Vue的原型对象，这样Vue的每个组件都可以通过.访问$http从而发出ajax请求
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
