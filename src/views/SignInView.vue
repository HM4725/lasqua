<template>
  <div class="login">
    <p>la squadra di blu</p>
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
        <default-button class="login-button" @click="login" type="submit" value="로그인"/>
      </div>
      <default-button class="logout-button" @click="logout" type="submit" value="로그아웃"/>
      <default-button class="get-user-button" @click="getUser" type="submit" value="정보확인"/>
    </form>
    <div>결과: {{result}}</div>
    <default-button @click="test" type="button" value="size"/>
  </div>
</template>

<script>
import DefaultButton from '../components/common/DefaultButton.vue'

export default{
  name: 'SignInView',
  components: {
    DefaultButton
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
      let path = "/api/login"
      let method = "post"
      let data = {id: this.id, pw: this.pw}
      let result = await this.$api(method, path, data)
      if(result) {
        this.result = result.status
      } else {
        this.result = "로그인 실패"
      }
    },
    async logout(e) {
      e.preventDefault()
      let path = "/api/logout"
      let method = "post"
      let result = await this.$api(method, path)
      if(result) {
        this.result = "로그아웃 성공"
        console.log(result)
      } else {
        this.result = "로그아웃 실패"
      }
    },
    async getUser(e) {
      e.preventDefault()
      let path = "/api/user/" + this.id
      let method = "get"
      let result = await this.$api(method, path)
      if(result) {
        console.log(result.data)
      }
    },
    test() {
      alert("inner" + window.innerHeight)
      alert("outer" + window.outerHeight)
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
    border: 1px solid var(--base-color);
  }
  .text-box:focus {
    outline: none;
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
</style>