import Vue from 'vue'
import {Button} from "element-ui";
import {Form, FormItem, Input} from "element-ui";
// 导入弹窗提示
import {Message} from "element-ui";
import {Container} from "element-ui";
import {Header} from "element-ui";
import {Aside} from "element-ui";
import {Main} from "element-ui";
import {Footer} from "element-ui";
import {Menu} from "element-ui";
import {Submenu} from "element-ui";
import {MenuItem} from "element-ui";

// 通过下面的方法，把组件注册为全局可用的组件,不能放在一起写
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Message组件需要挂载到Vue，只需要访问$message
Vue.prototype.$message = Message