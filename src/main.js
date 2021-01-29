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
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// 导入全局样式
import '@/assets/css/global.css'
// 对axios进行全局配置
import axios from 'axios'

// 让ajax携带cookie
// axios.defaults.withCredentials = true
// 配置请求根路径
axios.defaults.baseURL = 'https://df5c6f5b-e47c-4657-aeb9-f981a2503217.mock.pstmn.io'
// 设置默认头部
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
