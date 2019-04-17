import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css

import './permission' // permission control

import baseUtil from "@/utils/baseUtil";
import qUtil from "@/utils/queryUtil"
import validate from "@/utils/validate"

import App from './App.vue'
import router from './router'
import store from './store'

import adaptive from '@/directive/el-table/index.js'
import waves from '@/directive/waves/index.js'
Vue.use(adaptive.install)
Vue.use(waves.install)

Vue.use(Element, {
    size: 'small' // set element-ui default size
    // i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.baseUtil = baseUtil;
Vue.prototype.qUtil = qUtil;
Vue.prototype.validUtil = validate;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
