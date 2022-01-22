import axios from 'axios'

const HOST = "http://lasqua.bludi-blu.com/api"
axios.defaults.withCredentials = true

export default {
  methods: {
    async $api(method, path, data, headers) {
      return await axios({
        method: method,
        url: HOST + path,
        data: data,
        headers: headers
      })
    },
    $isMobile() {
      return window.innerWidth < 768
    },
    $handleWrongAccess(redirect) {
      alert('잘못된 접근입니다.')
      this.$router.push(redirect)
    },
    $processMessenger(message, redirect, query) {
      this.$router.push({
        name: 'message',
        params: {
          message: message,
          redirect: redirect
          },
        query: query
      })
    }
  }
}