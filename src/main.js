import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
const firebaseConfig = {
  apiKey: "AIzaSyALcy-dJ-mQNyvy9cy-SQba0sbKxErvIsw",
  authDomain: "thyeargear42.firebaseapp.com",
  projectId: "thyeargear42",
  storageBucket: "thyeargear42.appspot.com",
  messagingSenderId: "818161636537",
  appId: "1:818161636537:web:fcacebbab5115198337768"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
