import Vue from 'vue'
import store from "@/store/index.js"
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
