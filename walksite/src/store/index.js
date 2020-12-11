import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    afdeling: [],
    medarbejder: [],
  },
  getters: {
    Afdeling: (state) => {
      return state.name;
  }
  },
  mutations: {
    setAfdeling(state, afdeling){
      state.afdeling = afdeling
    },
    setMedarbejder(state, medarbejder){
      state.medarbejder = medarbejder
    }
  },
  actions: {
    getAfdeling({ commit }) {
      axios.get('http://localhost:5000/afdeling')
      .then(r => r.data)
        .then(afdeling => {
        commit('setAfdeling', afdeling)
        })
    },
    getMedarbejder({ commit }) {
      axios.get('http://localhost:5000/medarbejder').then((res) => {
        commit('setMedarbejder', res.data)
      })
    },
    
  },
  modules: {},
})
