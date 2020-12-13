import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";

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
      login (state, data){
        state.username = data.user
        state.password = data.pass
      },
      logout(state){
        state.username = null
        state.password = null
      }
    },
    plugins: [createPersistedState()]
  })