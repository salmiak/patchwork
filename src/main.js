import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocketio from 'vue-socket.io'
import VueClipboard from 'vue-clipboard2'
import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue'
import store from './store'
import router from './router'

var md = new (require('mobile-detect'))(window.navigator.userAgent)

Vue.config.productionTip = false

Vue.use(VueCookies)
if (process.env.NODE_ENV === "development") {
  Vue.use(VueSocketio, 'localhost:5000/')
} else {
  Vue.use(VueSocketio, '/')
}
Vue.use(VueClipboard)
Vue.use(Vue2TouchEvents)

new Vue({
  store,
  router,
  computed: {
    isMobile () {
      return md.phone()
    }
  },
  render: h => h(App)
}).$mount('#app')
