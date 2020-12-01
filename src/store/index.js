import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token:'123',
		groupList:[],
		machineList:[]
	},
	mutations: {
		//禁止异步操作
		updateGroup(state,alist){
			state.groupList = alist
			console.log("111111111111111111111111>"+state.groupList)
		},
		updateMachine(state,alist){
			state.machineList = alist
		}
	},
	actions: {
		//异步操作在这里
	},
	modules: {
	}
})
