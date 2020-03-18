import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      count: 0,
      username: null,
      password: null
    },
    mutations: {
      increment (state) {
        state.count++
      },
      login (state, username, password){
        state.username = username
        state.password = password
      }
    }
  })