import Vue from 'vue'


export const getters = {
	cartNumTotal: (state) => {
		return state.cart.reduce((num, ele) => {
			return num + ele.num
		}, 0)
	}
}