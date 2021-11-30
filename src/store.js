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
    isLoggedIn: (state) => Object.keys(state.user).length !== 0,
    getUserId: (state) => state.user.id
  },
  actions: {
    login: async ({commit}, payload) => {
      const response = await api("POST", "/login", payload)
      response && commit('login', payload)
      return response ? "success" : "fail"
    },
    logout: async ({commit}) => {
      const response = await api("POST", "/logout")
      response && commit('logout')
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