import Vue from 'vue'
import {http} from '@/common/service.js'

export const actions = {
	async checkSinopay({ commit, state }) {
		if(!state.sinopay.user_fundaccno_b) {
			let data = await http.get('sino_info')
			commit('updateSinopay', data.list)
		}
	},
	async checkReginalData({ commit, state }) {
		if(state.reginal_list.length == 0) {
			let data = await http.get('addressDetail')
			if(data.code != 1) return;
			commit('updateReginalData', JSON.parse(data.regional_list))
		}
	}
}