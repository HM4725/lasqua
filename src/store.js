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
    userId: (state) => state.user.id
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
    },
    validateIdSession: async ({getters}) => {
      if(!getters.userId) { return false }
      try {
        await api("GET", `/sessionvalid/${getters.userId}`)
        return true
      } catch(error) {
        console.error(error)
        return false
      }
    },
    validatePassword: async ({getters}, payload) => {
      try {
        await api("POST", `/user/${getters.userId}/pw`, payload)
        return true
      } catch(error) {
        console.error(error)
        return false
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