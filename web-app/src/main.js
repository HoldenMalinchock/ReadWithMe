import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router';
 

new Vue({
  axios,
  VueAxios,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
