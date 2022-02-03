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
      state.user.name = payload.name
      state.user.email = payload.email
      state.user.phone = payload.phone
      state.user.gender = payload.gender
      state.user.company = payload.company
    },
    logout: (state) => {
      state.user = {}
    }
  },
  getters: {
    userId: (state) => state.user.id,
    userRole: (state) => state.user.role,
    userInformation: (state) => state.user
  },
  actions: {
    login: async ({commit}, payload) => {
      try {
        await api('POST', '/login', payload)
        const response = await api('GET', `/user/${payload.id}/info`)
        const info = response.data
        // add fields which you want
        payload.role = info.role
        payload.name = info.name
        payload.email = info.email
        payload.phone = info.phone
        payload.gender = info.gender
        payload.company = info.company
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