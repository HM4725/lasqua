<template>
  <form class="findpw-page" @submit.prevent="submit" method="POST">
    <h1>비밀번호 찾기</h1>
    <p class="message">아이디와 이메일을 입력하세요.</p>
    <div class="id-box">
      <input-box id="findpw-id" type="text" placeholder="아이디"
        v-model="id.val" :disabled="email.check" autocomplete="off"/>
    </div>
    <div class="email-box">
      <input-box id="findpw-email" type="text" placeholder="이메일"
        v-model="email.val" :disabled="email.check"/>
    </div>
    <div class="auth-box" v-show="email.check">
      <input-box id="findpw-email-auth" type="text" placeholder="인증번호"
        v-model="email.number" :disabled="email.auth"/>
    </div>
    <p class="error">{{msg}}</p>
    <footer>
      <default-button class="button" value="뒤로" @click="cancel"/>
      <default-button class="button" type="submit" :value="email.button"/>
    </footer>
  </form>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'user.findpw.page1',
  components: {
    DefaultButton,
    InputBox
  },
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: {
        val: ''
      },
      email: {
        val: '',
        pattern: '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
        constraint: '올바른 이메일을 입력하세요.',
        check: false,
        auth: false,
        number: '',
        button: '인증'
      },
      msg: ''
    }
  },
  methods: {
    async submit() {
      if(this.id.val.length !== 0) {
        if(this.email.val.length !== 0) {
          if(this._isValid(this.email)) {
            if(!this.email.check) {
              if(await this._checkIdMail()) {
                this.email.check = true
                if(!await this._sendCheckMail()) {  
                  this.email.check = false
                }
              }
            } else {
              if (await this._checkMailNumber()) {
                const payload = {
                  auth: this.email.number,
                  email: this.email.val
                }
                this.$router.push({name: 'user.findpw.result', params: payload})
              } else {
                this.msg = '인증 번호가 일치하지 않습니다.'
              }
            }
          } else {
            this.msg = this.email.constraint
          }
        } else {
          this.msg = '이메일을 입력하세요.'
        }
      } else {
        this.msg = '아이디를 입력하세요.'
      }
    },
    cancel() {
      this.$router.push('/login')
    },
    // Private
    async _checkIdMail() {
      try {
        const payload = {id: this.id.val, email: this.email.val}
        await this.$api('POST', '/mailcheck', payload)
        return true
      } catch(error) {
        this.msg = '아이디와 이메일이 일치하지 않습니다.'
        return false
      }
    },
    async _sendCheckMail() {
      try {
        this.msg = '해당 메일로 인증번호를 보냈습니다.'
        await this.$api('POST', '/mail?val=pw', {email: this.email.val})
        this.msg = '메일에서 인증번호를 확인해 주세요.'
        return true
      } catch(error) {
        this.msg = '인증 메일 발송에 오류가 발생하였습니다.'
        return false
      }
    },
    async _checkMailNumber() {
      try {
        const payload = {
          email: this.email.val,
          number: this.email.number
        }
        this.email.auth = true
        await this.$api('POST', '/mailnumber', payload)
        return true
      } catch(error) {
        this.msg = '인증 번호가 일치하지 않습니다.'
        this.email.auth = false
        return false
      }
    },
    _isValid(target) {
      return new RegExp(target.pattern).test(target.val)
    },
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
  }
  .findpw-page > .email-box {
    margin-top: 16px;
  }
  .findpw-page > .auth-box {
    margin-top: 16px;
  }
  .findpw-page > .error {
    margin-top: 16px;
    text-align: left;
    color: red;
    word-break: keep-all;
  }
  .findpw-page > footer {
    text-align: right;
    padding: 16px 0;
  }
  .findpw-page > footer .button {
    margin-left: 16px;
  }
  @media (max-width: 767px) {
    .findpw-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>