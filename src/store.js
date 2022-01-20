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
      state.user.role = payload.role
    },
    logout: (state) => {
      state.user = {}
    }
  },
  getters: {
    userId: (state) => state.user.id,
    userRole: (state) => state.user.role
  },
  actions: {
    login: async ({commit}, payload) => {
      try {
        await api('POST', '/login', payload)
        const info = await ('GET', `/user/${payload.id}/info`)
        // add fields which you want
        payload.role = info.role
        commit('login', payload)
        return true
      } catch(error) {
        console.error(error)
        return false
      }
    },
    logout: async ({commit}) => {
      try {
        await api("POST", "/logout")
        commit('logout')
        return true
      } catch(error) {
        console.error(error)
        return false
      }
    },
    validateIdSession: async ({commit, getters}) => {
      if(!getters.userId) { return false }
      try {
        await api("GET", `/sessionvalid/${getters.userId}`)
        return true
      } catch(error) {
        commit('logout')
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