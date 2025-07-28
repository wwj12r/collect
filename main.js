import App from './App'
import uviewPlus from 'uview-plus'
import 'uview-plus/index.scss' // ✅ 引入样式（不能漏）
import './tailwind.css' // ✅ 引入 Tailwind CSS


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(uviewPlus)
	return {
		app
	}
}
// #endif