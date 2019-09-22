/* eslint-disable import/extensions */
import Vue from 'vue'
import VueRouter from 'vue-router'
import importI18n from 'plugins/i18n'
import registerComponent from 'utils/registerComponent'

import Toast from 'plugins/Toast'
import route from './routes'
// 需要用到vuex时，打开
// import store from './store';
import App from './App.vue'
// 通过iconfont使用svg时，打开此项
// import './themes/default/font/iconfont'

Vue.use(Toast)
Vue.use(VueRouter)
Vue.config.productionTip = false

// 全局注册自定义组件
registerComponent(Vue)

// 国际化支持
const i18n = importI18n(Vue)

const globalVue = new Vue({
  el: '#app',
  i18n,
  // store,   // 需要用到vuex时打开
  router: route(VueRouter),
  render: h => h(App),
  beforeCreate () {
    // 添加全局事件bus
    Vue.prototype.eventBus = this
    Vue.prototype.$defaultImg = require('images/img_default_photo.png')
  }
})

window.globalVue = globalVue
