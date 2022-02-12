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
    logout: (state) => {
      state.user = {}
    },
    setUser: (state, payload) => {
      for(let prop in payload) {
        state.user[prop] = payload[prop]
      }
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
        const payload2 = {
          id: payload.id,
          name: info.name,
          role: info.role,
          email: info.email,
          phone: info.phone,
          gender: info.gender,
          company: info.company,
          birth: info.birth
        }
        commit('setUser', payload2)
        return true
      } catch(error) {
        return false
      }
    },
    logout: async ({commit}) => {
      try {
        await api("POST", "/logout")
        commit('logout')
        return true
      } catch(error) {
        return false
      }
    },
    modify: async ({commit, state}, payload) => {
      try {
        payload.id = state.user.id
        await api("PUT", "/user", payload)
        delete payload.id
        commit('setUser', payload)
        return true
      } catch(error) {
        return false
      }
    },
    changePassword: async ({state}, payload) => {
      try {
        payload.id = state.user.id
        await api("PUT", "/user/pw", payload)
        return true
      } catch(error) {
        return false
      }
    },
    withdrawal: async ({commit, state}) => {
      try {
        await api("DELETE", `/user/${state.user.id}`)
        commit('logout')
        return true
      } catch(error) {
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
        await api("POST", `/user/${getters.userId}/validation/pw`, payload)
        return true
      } catch(error) {
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