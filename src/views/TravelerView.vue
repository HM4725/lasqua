<template>
  <div class="traveler">
    <h1>la squadra di blu</h1>
    <p>
      라스콰드라 디 블루에 속한<br>
      아티스트와 기업을 위한 페이지입니다.<br>
      제휴 희망시, 회원가입을 먼저 진행해주세요.
    </p>
    <form>
      <input type="text" v-model="id" placeholder="아이디">
      <input type="password" v-model="pw" placeholder="비밀번호">
      <button-component class="login-button" @click="login" type="submit" value="로그인"/>
      <div>결과: {{result}}</div>
    </form>
  </div>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue'

export default{
  components: {
    ButtonComponent
  },
  data() {
    return {
      id: '',
      pw: '',
      result: '',
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      let data = {id: this.id, pw: this.pw}
      let url = "http://lasqua.bludi-blu.com/api/login"
      this.result = await this.$api(url, "get", data)
    }
  }
}
</script>

<style scoped>

</style>