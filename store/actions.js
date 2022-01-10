import Vue from 'vue'
import {http} from '@/common/service.js'

export const actions = {
	async checkeIsLimit({ commit, dispatch, state }) {
		if(state.sinopayLimit == -1) {
			await dispatch('getSinopayLimit')
		}
	},
	async checkSinopay({ commit, dispatch, state }) {
		if(!state.sinopay.user_fundaccno_b) {
			await dispatch('getSinopay')
		}
	},
	async getSinopayLimit({ commit, state }) {
		let res = await http.get('moneyCenter3')
		if(res.code != 1) return
		commit('updateSinopay', res.list)
		commit('updateSinopayLimit', res.State)
	},
	async getSinopay({ commit, state }) {
		let res = await http.get('sino_info')
		if(res.code != 1) return
		commit('updateSinopay', res.list)
	},
	async checkReginalData({ commit, state }) {
		if(state.reginal_list.length == 0) {
			let res = await http.get('addressDetail')
			if(res.code != 1) return;
			commit('updateReginalData', JSON.parse(res.regional_list))
		}
	},
	async checkUserInfo({ commit, dispatch,state }) {
		if(!state.user.id) {
			await dispatch('getUserInfo')
		}
	},
	async getUserInfo({ commit, dispatch, state }) {
		let res = await dispatch('getUserInfoApi')
		if(res.code != 1) return;
		commit('updateUserInfo', res.list)
		uni.setStorageSync('market_user', res.list)
	},
	async getUserInfoApi() {
		return await http.get('memberInfo')
	}
	
}