// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.setConfig = function (config) {
  axios.defaults.baseURL = config.BASE_URL
  axios.defaults.timeout = config.TIMEOUT
}

const configPath = 'static/config.json'
axios.get(configPath).then(res => {
  Vue.prototype.g_Config = res.data
  axios.setConfig(Vue.prototype.g_Config)
  /* eslint-disable no-new */
  new Vue({
    store,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
