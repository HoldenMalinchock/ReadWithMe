import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router';
import vuex from 'vuex';
import store from './store/store'
//import VueVideoPlayer from 'vue-video-player'
//import VuetifyMediaPlayer from 'vuetify-media-player'
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueAxios, axios, vuex)

Vue.use(VueCoreVideoPlayer)

Vue.use(vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
