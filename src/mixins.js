import axios from 'axios'

const HOST = "https://lasqua.bludi-blu.com"
axios.defaults.withCredentials = true
export default {
    methods: {
        async $api(path, method, data) {
            // How to use:
            //   async func() {
            //     let url = "{{API URL}}"
            //     this.data = await this.$api(url, "get")
            //   }
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