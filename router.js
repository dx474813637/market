import {RouterMount,createRouter} from 'uni-simple-router';
import store from "@/store"
import { Loading, Message } from 'element-ui';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫

let noCheckArr = [
	'sinopay__sinopay_reg',
	'sinopay__sinopay_bind',
	'sinopay__money_center'
]
router.beforeEach(async (to, from, next) => {
	let model = to.name.split('__')[0]
	if(!store.state.index_info) {
		store.dispatch('getIndexInfo')
	}
	if( model == 'sinopay' && !noCheckArr.includes(to.name)) {
		if(store.state.sinopayLimit == -1) {
			let loadingInstance = Loading.service({
				fullscreen: true,
				text: '正在验证Sinopay账号权限',
				lock: true,
				spinner: 'el-icon-loading',
			});
			await store.dispatch('checkeIsLimit')
			setTimeout(() => {
				loadingInstance.close();
			}, 0)
			
		}
		if(store.state.sinopayLimit == 1) {
			Message.error('权限不足')
			uni.navigateTo({
				url: '/pages/money_center/money_center'
			})
		}
	}
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}