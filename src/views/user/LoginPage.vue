<template>
  <div class="login">
    <h2>la squadra di blu</h2>
    <p>
      라스콰드라 디 블루에 속한<br>
      아티스트와 기업을 위한 페이지입니다.<br>
      제휴 희망시, 회원가입을 먼저 진행해주세요.
    </p>
    <form class="login-form">
      <div class="login-wrapper">
        <div class="login-info">
          <input-box class="info-box" type="text" id="id" placeholder="아이디" autocomplete="on" focus v-model="id"/>
          <input-box class="info-box" type="password" id="pw" placeholder="비밀번호" autocomplete="off" v-model="pw"/>
        </div>
        <default-button class="login-button" @click.prevent="login" type="submit" value="로그인"/>
      </div>
      <div v-show="error" class="error-message">
        아이디 또는 비밀번호가 잘못 입력 되었습니다.<br>
        <strong>아이디</strong>와 <strong>비밀번호</strong>를 정확히 입력해 주세요.
      </div>
    </form>
    <footer class="etc">
      <router-button class="button" value="회원가입" link="/signup"/>
      <router-button class="button" value="아이디 찾기" link="/findid"/>
      <router-button class="button" value="비밀번호 찾기" link="/findpw"/>
    </footer>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'user.login.page',
  components: {
    DefaultButton,
    RouterButton,
    InputBox
  },
  data() {
    return {
      id: '',
      pw: '',
      error: false,
    }
  },
  methods: {
    async login() {
      this.error = false;
      const info = {id: this.id, pw: this.pw}
      const result = await this.$store.dispatch("login", info)
      if(result) {
        this.$router.push('/')
      } else {
        this.error = true
      }
    },
  },
}
</script>

<style scoped>
  .login {
    width: 400px;
  }
  form.login-form {
    margin: 16px 0;
  }
  .login-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border: 1px solid var(--base-color);
    padding: 16px 0;
  }
  .login-info {
    width: 230px;
  }
  .info-box {
    width: 100%;
    margin: 3px;
  }
  .error-message {
    color: red;
  }
  footer.etc {
    display: flex;
    flex-direction: row;
    column-gap: 16px;
  }
  footer.etc > .button {
    flex: 1;
  }
  @media (max-width: 767px) {
    .login {
      width: 100%;
      padding: var(--mobile-padding-size);
    }
    .login-wrapper {
      padding: 16px;
    }
    .login-info {
      width: 70%;
      margin-right: 16px;
    }
    footer.etc {
      margin: 0 16px 16px 16px;
      row-gap: 16px;
      flex-direction: column;
    }
  }
</style>