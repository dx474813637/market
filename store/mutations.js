import Vue from 'vue'

export const mutations = {
	updatemenuActive(state, index) {
		state.menuActive = index
	},
	updateSinopay(state, info) {
		state.sinopay = info
	},
	updateCartList(state, data) {
		if(data.action == 'clearAll') {
			state.cart = [];
		}else if(data.action == 'delete'){
			state.cart = state.cart.filter(ele => {
				return !data.idArr.includes(ele.id)
			})
		}else if(data.action == 'updateNumber'){
			state.cart.some(ele => {
				if(ele.id == data.id) {
					ele.num = data.num
					return true
				}
				return false
			})
		}else if(data.action == 'updateChecked'){
			state.cart.forEach(ele => {
				if(data.arr.includes(ele.id) && !ele.checked) {
					ele.checked = true
				}
				if(!data.arr.includes(ele.id) && ele.checked){
					ele.checked = false
				}
			})
		}
		uni.setStorageSync('cart', state.cart)
	},
}