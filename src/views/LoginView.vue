<template>
  <div class="traveler">
    <h1>la squadra di blu</h1>
    <p>
      라스콰드라 디 블루에 속한<br>
      아티스트와 기업을 위한 페이지입니다.<br>
      제휴 희망시, 회원가입을 먼저 진행해주세요.
    </p>
    <form class="login-form">
      <div class="login-wrapper">
        <div class="login-info">
          <input type="text" name="id" class="text-box" v-model="id" placeholder="아이디">
          <input type="password" name="pw" class="text-box" v-model="pw" placeholder="비밀번호">
        </div>
        <button-component class="login-button" @click="login" type="submit" value="로그인"/>
      </div>
    </form>
    <div>결과: {{result}}</div>
  </div>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue'

export default{
  name: 'LoginView',
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
      let info = {id: this.id, pw: this.pw}
      let path = "/api/login"
      let result = await this.$api(path, "post", info)
      if(result) {
        this.result = result.status
      } else {
        this.result = "로그인 실패"
      }
    }
  }
}
</script>

<style scoped>
  .login-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 20rem;
  }
  .login-info {
    width: 10rem;
  }
  .text-box {
    width: 100%;
    margin: 3px;
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  .text-box:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.25);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
</style>