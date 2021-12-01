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
      try {
        await api("POST", "/login", payload)
        commit('login', payload)
        return "success"
      } catch(error) {
        console.error(error)
        return "fail"
      }
    },
    logout: async ({commit}) => {
      try {
        await api("POST", "/logout")
        commit('logout')
        return "success"
      } catch(error) {
        console.error(error)
        return "fail"
      }
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