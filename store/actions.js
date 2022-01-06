import Vue from 'vue'
import {http} from '@/common/service.js'

export const actions = {
	async checkSinopay({ commit, state }) {
		if(!state.sinopay.user_fundaccno_b) {
			let data = await http.get('sino_info.html')
			commit('updateSinopay', data.list)
		}
	}
}