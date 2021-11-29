import { createStore } from "vuex"
import persistedstate from "vuex-persistedstate"
import mixins from './mixins.js'

const api = mixins.methods.$api

const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    login: (state, payload) => {
      state.user.id = payload.id
    },
    logout: (state) => {
      state.user = {}
    }
  },
  getters: {
    isLoggedIn: (state) => Object.keys(state.user).length !== 0
  },
  actions: {
    login: async ({commit}, payload) => {
      const response = await api("POST", "/api/login", payload)
      response && commit('login', payload)
      return response ? "success" : "fail"
    }
  },
  plugins: [
    persistedstate({
      paths: [
        'user'
      ]
    })
  ]
})

export default store