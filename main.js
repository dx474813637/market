import Vue from 'vue'
import App from './App'
import element from './element/index'
import { http } from '@/common/service.js'
import store from './store'
import filters from '@/static/js/filters.js'
import {router,RouterMount} from './router.js'  //路径换成自己的
Vue.use(router)
 
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))
Vue.use(element)

import uView from "uview-ui";
Vue.use(uView);


Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5 || VUE3
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

