import axios from 'axios'

const HOST = "http://lasqua.bludi-blu.com"
axios.defaults.withCredentials = true

export default {
  methods: {
    async $api(method, path, data) {
      return await axios({
        method: method,
        url: HOST + path,
        data: data
      }).catch(error => {
        if(error.response) {
          console.log(error.response.status)
        }
      })
    }
  }
}