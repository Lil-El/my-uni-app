import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		dictData: {}
	},
	getters: {
	    getDictByCode(state) {
	        return state.dictData;
	    },
	},
	mutations: {
	    SET_DICT: function(state, map) {
	        const { key, val = [] } = map;
	        state.dictData[key] = val;
	    },
	},
	actions: {
	    getDictByCode({ commit, getters }, code) {
	        if (getters.getDictByCode[code]) return getters.getDictByCode[code];
	        return uni.$u.http.get("/dict/getByParentCode", {params: {parentCode: code}}).then((res) => {
				commit("SET_DICT", { key: code, val: res.data.data });
				return res.data.data;
			})
	    },
	}
})

export default store
