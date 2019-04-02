import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import SimpleVueValidation from "simple-vue-validator";
import baseUtil from "@/utils/baseUtil";
import qUtil from "@/utils/queryUtil"

import 'element-ui/lib/theme-chalk/index.css'
import './assets/fa/font-awesome.css'
import '@/assets/styles/index.scss' // global css
import 'normalize.css/normalize.css'// A modern alternative to CSS resets


import validatorMessage from "@/utils/validatorMessage";

import '@/assets/styles/index.scss'

import './permission' // permission control

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})
/* 简单验证，全局配置*/
Vue.use(SimpleVueValidation);
SimpleVueValidation.extendTemplates(validatorMessage);
Vue.prototype.validator = SimpleVueValidation.Validator;

Vue.prototype.baseUtil = baseUtil;
Vue.prototype.qUtil = qUtil;
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
