import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from "./mutations.js"
import {actions} from "./actions.js"
import {state} from "./state.js"
import {getters} from "./getters.js"
Vue.use(Vuex)
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})


export default store
