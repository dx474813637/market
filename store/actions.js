import Vue from 'vue'
import {http} from '@/common/service.js'

export const actions = {
	async checkSinopay({ commit, dispatch, state }) {
		if(!state.sinopay.user_fundaccno_b) {
			await dispatch('getSinopay')
		}
	},
	async getSinopay({ commit, state }) {
		let data = await http.get('sino_info')
		commit('updateSinopay', data.list)
	},
	async checkReginalData({ commit, state }) {
		if(state.reginal_list.length == 0) {
			let data = await http.get('addressDetail')
			if(data.code != 1) return;
			commit('updateReginalData', JSON.parse(data.regional_list))
		}
	},
	async checkUserInfo({ commit, dispatch,state }) {
		if(!state.user.id) {
			await dispatch('getUserInfo')
		}
	},
	async getUserInfo({ commit, dispatch, state }) {
		let data = await dispatch('getUserInfoApi')
		if(data.code != 1) return;
		commit('updateUserInfo', data.list)
		uni.setStorageSync('market_user', data.list)
	},
	async getUserInfoApi() {
		return await http.get('memberInfo')
	}
	
}