import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocketio from 'vue-socket.io'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(VueSocketio, 'http://localhost:3000')

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
