<template>
  <form class="findpw-page" @submit.prevent="submit" method="POST">
    <h1>비밀번호 변경</h1>
    <p class="message">
      안전한 사용을 위하여, 기존 비밀번호를 변경해야 합니다.<br>
      아래에 새 비밀번호를 입력해 주세요.
    </p>
    <div class="pw-box">
      <input-box id="findpw-pw" type="password" placeholder="새 비밀번호"
        @input="v=>{pw.val=v}" autocomplete="off"/>
    </div>
    <div class="pwconfirm-box">
      <input-box id="findpw-pwconfirm" type="password" placeholder="비밀번호 확인"
        @input="v=>{confirmPw.val=v}" autocomplete="off"/>
    </div>
    <p class="error">{{error}}</p>
    <footer>
      <default-button class="button" type="submit" value="변경"/>
    </footer>
  </form>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'user.findpw.page2',
  components: {
    DefaultButton,
    InputBox
  },
  props: {
    auth: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pw: {
        val: '',
        pattern: '^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!-/:-@\\[-`{-~]).{8,20}$',
        constraint: '영문, 숫자와 특수문자를 모두 포함하며, 8 ~ 20자 이내여야 합니다.'
      },
      confirmPw: {
        val: ''
      },
      error: ''
    }
  },
  methods: {
    async submit() {
      if(this.pw.val.length !== 0) {
        if(this._isValid(this.pw)) {
          if(this.pw.val === this.confirmPw.val) {
            const payload = {email: this.email, pw: this.pw.val}
            try {
              await this.$api("PUT", `/pw/${this.auth}`, payload)
              this.$processMessenger('비밀번호가 정상적으로 변경되었습니다.',
                '/login')
            } catch(error) {
              this.error = this.pw.constraint
            }
          } else {
            this.error = '비밀번호가 일치하지 않습니다.'
          }
        } else {
          this.error = this.pw.constraint
        }
      } else {
        this.error = '새 비밀번호를 입력하세요.'
      }
    },
    // Private
    _isValid(target) {
      return new RegExp(target.pattern).test(target.val)
    },
  },
  created() {
    // if(this.auth === '' || this.email === '') {
    //   this.$handleWrongAccess('/')
    // } else {
    //   this.findId()
    // }
  }
}
</script>

<style scoped>
  .findpw-page {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 300px;
  }
  .findpw-page > .message {
    text-align: left;
    padding-left: 8px;
    margin-bottom: 16px;
    word-break: keep-all;
  }
  .findpw-page > .pw-box {
    margin-bottom: 16px;
  }
  .findpw-page > .pwconfirm-box {
    margin-bottom: 16px;
  }
  .findpw-page > .error {
    margin-bottom: 16px;
    word-break: keep-all;
    color: red;
  }
  .findpw-page > footer {
    text-align: right;
    padding: 16px 0;
  }
  .findpw-page > footer > .button {
    margin-left: 16px;
  }
</style>