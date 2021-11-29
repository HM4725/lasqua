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
          <input type="text" name="id" class="text-box" v-model="id" placeholder="아이디" autocomplete="username">
          <input type="password" name="pw" class="text-box" v-model="pw" placeholder="비밀번호" autocomplete="current-password">
        </div>
        <default-button class="login-button" @click="login" type="submit" value="로그인"/>
      </div>
      <div v-show="error" class="error-message">
        아이디 또는 비밀번호가 잘못 입력 되었습니다.<br>
        <strong>아이디</strong>와 <strong>비밀번호</strong>를 정확히 입력해 주세요.
      </div>
    </form>
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
      error: false,
    }
  },
  methods: {
    async login(e) {
      this.error = false;
      e.preventDefault()
      const result = await this.$store.dispatch("login", {id: this.id, pw: this.pw})
      if(result === "success") {
        const redirect = this.$route.query.redirect
        if(redirect) {
          this.$router.push(redirect)
        } else {
          this.$router.go(-1)
        }
      } else {
        this.error = true
      }
    },
  },
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
  .error-message {
    color: red;
  }
</style>