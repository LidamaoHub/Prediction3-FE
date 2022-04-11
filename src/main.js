import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import axios from "axios"

Vue.use(Antd)

import {ethers} from 'ethers'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$ethers = ethers
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
