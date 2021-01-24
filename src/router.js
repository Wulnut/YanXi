import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {path: '/', redirect: '/'},
        {path: '/login', component: Login},
        {path: '/home', component: Home}
    ]
})

// 挂载路由导航守卫
/** 和拦截器差不多，帮助进行权限管理
 * @param to 将要访问的路径
 * @param from 代表从那个路径跳转而来
 * @param next() 是一个函数，表示放行, next() 放行 next('/login') 强制跳转
 * */
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') return next()
//     // 获取token
//     const tokenStr = window.sessionStorage.getItem('token');
//     if (!tokenStr) return next('/login');
//     next()
// })

export default router