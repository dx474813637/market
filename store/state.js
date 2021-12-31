import Vue from 'vue'
import menuList from '@/static/js/menuList.js'
import { setCartData } from '@/static/js/setCartData.js'
setCartData()
export const state = {
	menuList,
	menuActive: '',
	cart: uni.getStorageSync('cart') || [],
	
}