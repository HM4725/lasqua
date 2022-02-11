<template>
  <form class="findid-page" @submit.prevent="submit" method="POST">
    <h1>아이디 찾기</h1>
    <p class="message">이메일을 입력하세요.</p>
    <div>
      <input-box id="findid-email" type="text" placeholder="이메일"
        @input="v=>{email.val=v}" :disabled="email.check"/>
    </div>
    <div class="auth-box" v-show="email.check">
      <input-box id="findid-email-auth" type="text" placeholder="인증번호"
        @input="v=>{email.number=v}" :disabled="email.auth"/>
    </div>
    <p class="error">{{email.msg}}</p>
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
  name: 'user.findid.page1',
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
      email: {
        val: '',
        pattern: '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
        constraint: '올바른 이메일을 입력하세요.',
        msg: '',
        check: false,
        auth: false,
        number: '',
        button: '인증'
      },
    }
  },
  methods: {
    async submit() {
      if(this.email.val.length !== 0) {
        if(this._isValid(this.email)) {
          if(!this.email.check) {
            this.email.check = true
            if(!await this._sendCheckMail()) {
              this.email.check = false
            }
          } else {
            if (await this._checkMailNumber()) {
              const payload = {
                auth: this.email.number,
                email: this.email.val
              }
              this.$router.push({name: 'user.findid.result', params: payload})
            } else {
              this.email.msg = '인증 번호가 일치하지 않습니다.'
            }
          }
        } else {
          this.email.msg = this.email.constraint
        }
      } else {
        this.email.msg = '이메일을 입력하세요.'
      }
    },
    cancel() {
      this.$router.push('/login')
    },
    // Private
    async _sendCheckMail() {
      try {
        this.email.msg = '해당 메일로 인증번호를 보냈습니다.'
        await this.$api('POST', '/mail?val=id', {email: this.email.val})
        this.email.msg = '메일에서 인증번호를 확인해 주세요.'
        return true
      } catch(error) {
        this.email.msg = '인증 메일 발송에 오류가 발생하였습니다.'
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
        this.email.msg = '인증 번호가 일치하지 않습니다.'
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
  .findid-page {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 300px;
  }
  .findid-page > .message {
    text-align: left;
    padding-left: 8px;
    margin-bottom: 16px;
  }
  .findid-page > .auth-box {
    margin-top: 16px;
  }
  .findid-page > .error {
    margin-top: 16px;
    color: red;
    word-break: keep-all;
  }
  .findid-page > footer {
    text-align: right;
    padding: 16px 0;
  }
  .findid-page > footer .button {
    margin-left: 16px;
  }
</style>