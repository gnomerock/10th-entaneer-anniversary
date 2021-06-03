import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import './assets/css/main.css'

import { BootstrapVue, IconsPlugin  } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSimpleAlert from "vue-simple-alert";
 
Vue.use(VueSimpleAlert);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
