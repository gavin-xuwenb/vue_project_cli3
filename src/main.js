import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './axios/http.js'
import Meta from 'vue-meta'
import 'assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(ElementUI, { size: 'small' });

Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
