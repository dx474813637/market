import Vue from 'vue'
import menuList from '@/static/js/menuList.js'
import { setCartData } from '@/static/js/setCartData.js'
setCartData()
export const state = {
	menuList,
	menuActive: '',
	cart: uni.getStorageSync('cart') || [],
	reginal_list: [],
	sinopay: {
		// business_flag 
		// lecerti_code 法人身份证
		// legal_name 法人
		// sinop_type "C"
		// sinopay_pay_pass 1
		// user_fundaccno_b 付款账户id
		// user_fundaccno_s 收款账户id
		// auth_state 1
		// State 
		bind_info: {
			// auth_state
			// state
			// market_remark
			// market_unbind_remark
		},
		
	}
	
}