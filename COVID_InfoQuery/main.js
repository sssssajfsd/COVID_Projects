import App from './App'
// import "@/mock/mockServe"
import * as request from './utils/request'
// #ifndef VUE3
import Vue from 'vue'

// import './mock/mockServer.js'
import {VueJsonp} from 'vue-jsonp'
Vue.config.productionTip = false
Vue.prototype.$request = request;
Vue.use(VueJsonp)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif