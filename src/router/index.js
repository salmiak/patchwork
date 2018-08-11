import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: App },
    { path: '/:gameSession', component: App }
  ]
})
