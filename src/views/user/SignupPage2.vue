<template>
  <form class="signup" @submit.prevent="submit" method="POST">
    <h1>회원가입</h1>
    <div class="signup-info">
      <div class="necessary">
        <h3>필수 사항</h3>
        <input-box id="signup-id" type="text" placeholder="아이디" autocomplete="off" @input="v=>{id.val=v}" focus/>
        <span class="message">{{id.msg}}</span>
        <input-box id="signup-pw" type="password" placeholder="비밀번호" autocomplete="off" @input="v=>{pw.val=v}"/>
        <span class="message">{{pw.msg}}</span>
        <input-box id="signup-confirmPw" type="password" placeholder="비밀번호 확인" autocomplete="off" @input="v=>{confirmPw.val=v}"/>
        <span class="message">{{confirmPw.msg}}</span>
        <input-box id="signup-name" type="text" placeholder="이름" @input="v=>{name.val=v}"/>
        <span class="message">{{name.msg}}</span>
        <form @submit.prevent="authMail" method="POST">
          <div class="input-with-button">
            <input-box id="signup-email" type="text" placeholder="이메일" @input="v=>{email.val=v}"
              :disabled="email.auth"/>
            <default-button class="button" type="submit" :value="email.button" v-if="!email.auth"/>
          </div>
          <div class="input-with-button" v-show="email.check">
            <input-box id="signup-email-auth" type="text" placeholder="인증번호" @input="v=>{email.number=v}"/>
            <default-button class="button" value="취소" @click="cancelAuthMail"/>
          </div>
        </form>
        <span class="message">{{email.msg}}</span>
        <input-box id="signup-phone" type="text" placeholder="전화번호" @input="v=>{phone.val=v}"/>
        <span class="message">{{phone.msg}}</span>
      </div>
      <div class="optional">
        <h3>선택 사항</h3>
        <radio-box id="signup-company" title="회원 구분" :options="company.options" :checked="company.checked" ref="company"/>
        <radio-box id="signup-gender" title="성별" :options="gender.options" :checked="gender.checked" ref="gender"/>
        <date-box id="signup-regdate" placeholder="생년월일" ref="birth"/>
      </div>
    </div>
    <footer>
      <default-button class="button" type="button" value="취소" @click.prevent="cancel"/>
      <default-button class="button" type="submit" value="가입"/>
    </footer>
  </form>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import RadioBox from '@/components/form/RadioBox.vue'
import DateBox from '@/components/form/DateBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: "user.signup.page2",
  components: {
    InputBox,
    RadioBox,
    DateBox,
    DefaultButton
  },
  props: {
    agreements: {
      type: String,
      default: "false"
    }
  },
  data() {
    return {
      id: {
        val: '',
        pattern: '^[0-9a-zA-Z]{4,15}$',
        constraint: '영문과 숫자만 허용되며, 4 ~ 15자 이내여야 합니다.',
        msg: '',
        required: true
      },
      pw: {
        val: '',
        pattern: '^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!-/:-@\\[-`{-~]).{8,20}$',
        constraint: '영문, 숫자와 특수문자를 모두 포함하며, 8 ~ 20자 이내여야 합니다.',
        msg: '',
        required: true
      },
      confirmPw: {
        val: '',
        msg: '',
        required: true
      },
      name: {
        val: '',
        pattern: '^[가-힣a-zA-Z0-9]{1,10}$',
        constraint: '공백 및 특수문자 사용 불가하며, 10자 이내여야 합니다.',
        msg: '',
        required: true
      },
      email: {
        val: '',
        pattern: '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
        constraint: '올바른 이메일을 입력하세요.',
        msg: '',
        check: false,
        auth: false,
        number: '',
        button: '인증',
        required: true
      },
      phone: {
        val: '',
        pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$',
        constraint: '{2~3자리 숫자}-{3~4자리 숫자}-{4자리 숫자}',
        msg: '',
        required: true
      },
      gender: {
        options: {M: '남자', F: '여자', N: '그 외'},
        checked: 'N',
        required: false
      },
      company: {
        options: {Y: '기업회원', N: '일반회원'},
        checked: 'N',
        required: false
      },
      // birth: {
      //   val: '',
      //   required: false
      // },
    }
  },
  methods: {
    // Event API
    cancel() {
      this.$router.push('/')
    },
    async submit() {
      try {
        for(let key in this.$data) {
          if(this.$data[key].msg !== undefined) {
            this.$data[key].msg = ''
          }
        }
        this._validation(this.$data)
        await this._signup(this.$data)
      } catch(errors) {
        for(let key in errors) {
          this.$data[key].msg = errors[key]
        }
      }
    },
    async authMail() {
      if(this.email.val.length !== 0) {
        if(this._isValidate(this.email)) {
          if(!this.email.check) {
            const send = await this._sendCheckMail()
            if(!send) {
              this.email.msg = '인증 메일 발송에 오류가 발생하였습니다.'
            }
          } else {
            if (await this._checkMailNumber()) {
              this.email.msg = ''
              this.email.auth = true
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
    cancelAuthMail() {
      this.email.button = '인증'
      this.email.msg = ''
      this.email.check = false
    },
    // Child API
    clearBox(target) {
      target.msg = ''
    },
    // Private Methods
    async _sendCheckMail() {
      try {
        this.email.button = '확인'
        this.email.check = true
        this.email.msg = '해당 메일로 인증번호를 보냈습니다.'
        await this.$api('POST', '/mail?val=sign', {email: this.email.val})
        this.email.msg = this.email.check ? '메일에서 인증번호를 확인해 주세요.' : ''
        return true
      } catch(error) {
        return false
      }
    },
    async _checkMailNumber() {
      try {
        const payload = {
          email: this.email.val,
          number: this.email.number
        }
        await this.$api('POST', '/mailnumber', payload)
        this.email.check = false
        return true
      } catch(error) {
        return false
      }
    },
    _checkVacantFields(data) {
      const errors = {}
      for(let key in data) {
        let input = data[key]
        if(input.required && input.val.length === 0) {
          errors[key] = "필수 사항입니다."
        }
      }
      return errors
    },
    _checkEmail(data) {
      const errors = {}
      if(!data['email'].auth) {
        errors['email'] = '이메일을 인증하세요.'
      }
      return errors
    },
    _checkConfirmPw(data) {
      const errors = {}
      if(data['pw'].val !== data['confirmPw'].val) {
        errors['confirmPw'] = '비밀번호가 일치하지 않습니다.'
      }
      return errors
    },
    _isValidate(input) {
      return !('pattern' in input) || new RegExp(input.pattern).test(input.val)
    },
    _checkValidFields(data) {
      const errors = {}
      for(let key in data) {
        let input = data[key]
        if(!this._isValidate(input)) {
          errors[key] = input.constraint
        }
      }
      return errors
    },
    _validation(data) {
      let errors
      errors = this._checkVacantFields(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
      errors = this._checkConfirmPw(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
      errors = this._checkEmail(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
      errors = this._checkValidFields(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
    },
    async _signup(data) {
      const newUser = {
        id: data.id.val, 
        pw: data.pw.val,
        name: data.name.val,
        email: data.email.val,
        phone: data.phone.val,
        company: this.$refs.company.getValue(),
        gender: this.$refs.gender.getValue(),
        birth: this.$refs.birth.getValue()
      }
      try {
        await this.$api("POST", "/signup", newUser)
        const result = await this.$store.dispatch("login", {id: data.id.val, pw: data.pw.val})
        if(result) {
          const msg = '회원가입이 정상적으로 완료되었습니다.'
          this.$processMessenger(msg, `/artist/${this.$store.getters.userId}`, {signup: 1})
        } else {
          console.error('fail')
        }
      } catch(e) {
        if(e.response) {
          const response = e.response.data
          if('Required fields missing' in response) {
            throw this._checkVacantFields(data)
          } else {
            const errors = {}
            if(!response['Id validation']) {
              errors.id = data.id.constraint
            }
            if(!response['Pw validation']) {
              errors.pw = data.pw.constraint
            }
            if(!response['Name validation']) {
              errors.name = data.name.constraint
            }
            if(!response['Email validation']) {
              errors.email = data.email.constraint
            }
            if(!response['Phone validation']) {
              errors.phone = data.phone.constraint
            }
            if(!response['Id Unique']) {
              errors.id = "중복된 아이디입니다."
            }
            throw errors
          }
        }
      }
    }
  },
  created() {
    this.agreements !== 'true' && this.$handleWrongAccess('/signup1')
  }
}
</script>

<style scoped>
  .signup {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .signup-info {
    display: flex;
    flex-direction: row;
    width: 600px;
  }
  .signup-info > div {
    margin: 16px;
    flex: 1;
  }
  .signup-info > div > * {
    margin: 8px 0;
  }
  .signup > footer {
    margin: 16px;
  }
  .signup > footer > .button {
    margin: 0 12px;
  }
  .input-with-button {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .input-with-button > .button {
    margin-left: 16px;
    padding: 8px;
    height: 40px;
    min-height: 0;
  }
  .input-with-button > .hidden {
    visibility: hidden;
  } 
  .message {
    color: red;
  }
  @media (max-width: 767px) {
    .signup {
      width: 100%;
      padding: var(--mobile-padding-size);
    }
    .signup-info {
      flex-direction: column;
      width: 100%;
    }
    .signup-info > div {
      margin: 0;
    }
  }
</style>