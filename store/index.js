import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {}
	},
	getters: {
		getUser(state) {
			return state.user
		}
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		}
	},
	actions: {
		fetchUserInfoByTk({ commit }) {
			return new Promise((resolve, reject)=>{
				const token = uni.getStorageSync('TOKEN');
				if(token){
					setTimeout(() => {
						const user = {
							name: "MINO",
							phone: '15035250351',
							role: 'admin',
							address: '韩国首尔',
							age: 23,
							sex: 1
						}
						commit("SET_USER", user)
						uni.setStorageSync("TOKEN", '123')
						getApp().globalData.userInfo = user;
						resolve();
					}, 1000)
				}else{
					resolve()
				}
			})
		},
		login({ commit }, user) {
			return new Promise((resolve, reject) => {
				if(user.name === 'user'){
					user.role = "user";
				}else if(user.name === 'MINO'){
					user.role = "admin";
				}else{
					reject("登录失败")
				}
				user.phone = "15012340351";
				commit("SET_USER", user);
				uni.setStorageSync("TOKEN", '123')
				getApp().globalData.userInfo = user;
				resolve("登录成功")
			})
		},
		logout({ commit }, user) {
			commit("SET_USER", {});
			getApp().globalData.userInfo = null;
			uni.clearStorageSync();
		}
	}
})
export default store
