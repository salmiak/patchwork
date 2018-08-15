import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocketio from 'vue-socket.io'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueCookies)
if (process.env.NODE_ENV === "development") {
  Vue.use(VueSocketio, 'localhost:5000/')
} else {
  Vue.use(VueSocketio, '/')
}
Vue.use(VueClipboard)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
