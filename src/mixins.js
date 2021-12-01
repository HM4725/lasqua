import axios from 'axios'

const HOST = "http://lasqua.bludi-blu.com/api"
axios.defaults.withCredentials = true

export default {
  methods: {
    async $api(method, path, data) {
      return await axios({
        method: method,
        url: HOST + path,
        data: data
      })
    }
  }
}