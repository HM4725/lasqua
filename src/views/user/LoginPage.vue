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
          <input-box class="info-box" type="text" id="id" placeholder="아이디" autocomplete="on" focus @input="v=>id=v"/>
          <input-box class="info-box" type="password" id="pw" placeholder="비밀번호" autocomplete="off" @input="v=>pw=v"/>
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
      <router-button class="button" value="아이디 찾기" link="/findid1"/>
      <router-button class="button" value="비밀번호 찾기" link="/findpw1"/>
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
    width: 24rem;
  }
  form.login-form {
    margin: 1rem 0;
  }
  .login-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border: 1px solid var(--base-color);
    padding: 1rem 0;
  }
  .login-info {
    width: 15rem;
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
    column-gap: 1rem;
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
      padding: 1rem;
    }
    .login-info {
      width: 70%;
      margin-right: 1rem;
    }
    footer.etc {
      margin: 0 1rem 1rem 1rem;
      row-gap: 1rem;
      flex-direction: column;
    }
  }
</style>