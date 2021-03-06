/**
* Created by 垃圾桶.
* Date: 2021-1-27
*/
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/www/login'
import admin_Home from '@/components/admin/Home'
import admin_login from '@/components/admin/Login'
import Welcome from '@/components/admin/Welcome'
import admin_Users from '@/components/admin/user/adminUsers'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/admin-login', component: admin_login },
    { path: '/admin-home', component: admin_Home, redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/userList', component: admin_Users }
      ] }
  ]
})

// 挂载路由导航守卫
/** 和拦截器差不多，帮助进行权限管理
 * @param to 将要访问的路径
 * @param from 代表从那个路径跳转而来
 * @param next() 是一个函数，表示放行, next() 放行 next('/login') 强制跳转
 * */
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
