<template>
  <form class="signup" @submit.prevent="submit" method="POST">
    <h1>회원가입</h1>
    <div class="signup-info">
      <div class="necessary">
        <h3>필수 사항</h3>
        <input-box id="signup-id" type="text" placeholder="아이디" autocomplete="off"
          v-model="id.val" focus/>
        <p class="message">{{id.msg}}</p>
        <input-box id="signup-pw" type="password" placeholder="비밀번호" autocomplete="off"
          v-model="pw.val"/>
        <p class="message">{{pw.msg}}</p>
        <input-box id="signup-confirmPw" type="password" placeholder="비밀번호 확인" autocomplete="off"
          v-model="confirmPw.val"/>
        <p class="message">{{confirmPw.msg}}</p>
        <input-box id="signup-name" type="text" placeholder="이름" v-model="name.val"/>
        <p class="message">{{name.msg}}</p>
        <form @submit.prevent="authMail" method="POST">
          <div class="input-with-button">
            <input-box id="signup-email" type="text" placeholder="이메일" v-model="email.val"
              :disabled="email.check||email.auth"/>
            <default-button class="button" type="submit" :value="email.button" v-if="!email.auth"/>
          </div>
          <div class="input-with-button" v-show="email.check">
            <input-box id="signup-email-auth" type="text" placeholder="인증번호"
              v-model="email.number"/>
            <default-button class="button" value="취소" @click="cancelAuthMail"/>
          </div>
        </form>
        <p class="message">{{email.msg}}</p>
        <input-box id="signup-phone" type="text" placeholder="전화번호" subplaceholder="예) 010-0000-0000"
          v-model="phone.val"/>
        <p class="message">{{phone.msg}}</p>
      </div>
      <div class="optional">
        <h3>선택 사항</h3>
        <radio-box id="signup-company" title="회원 구분" :options="company.options" v-model="company.val"
          @update:modelValue="selectCompany"/>
        <p class="message">{{company.msg}}</p>
        <radio-box v-show="company.val==='N'" id="signup-gender" title="성별" :options="gender.options" 
          v-model="gender.val"/>
        <p v-show="company.val==='N'" class="message">{{gender.msg}}</p>
        <input-box v-show="company.val==='N'" id="signup-birth" type="text" placeholder="생년월일"
          subplaceholder="예) 2000-01-01" v-model="birth.val"/>
        <p v-show="company.val==='N'" class="message">{{birth.msg}}</p>
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
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: "user.signup.page2",
  components: {
    InputBox,
    RadioBox,
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
        constraint: '올바른 형식으로 입력하세요.',
        msg: '',
        required: true
      },
      gender: {
        options: {M: '남자', F: '여자', N: '그 외'},
        val: 'N',
        msg: '',
        required: false
      },
      company: {
        options: {Y: '기업회원', N: '일반회원'},
        val: 'N',
        msg: '',
        required: false
      },
      birth: {
        val: '',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        constraint: '올바른 형식으로 입력하세요.',
        msg: '',
        required: false
      },
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
        if(this._isValid(this.email)) {
          if(!this.email.check) {
            await this._sendCheckMail()
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
    selectCompany(v) {
      if(v === 'Y') {
        this.gender.val = 'N'
        this.birth.val = ''
      }
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
        return true
      } catch(error) {
        this.email.button = '인증'
        this.email.check = false
        const status = error.response.status
        if(status === 400) {
          this.email.msg = '인증 메일 발송에 오류가 발생하였습니다.'
        } else if(status === 406) {
          this.email.msg = '이미 가입된 메일입니다. 다른 이메일을 사용하시거나, 아이디 찾기를 진행해주세요.'
        }
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
    _checkSeveralFields(data) {
      // Check Password
      if(data['pw'].val !== data['confirmPw'].val) {
        return {confirmPw: '비밀번호가 일치하지 않습니다.'}
      }
      // Check Email
      if(!data['email'].auth) {
        return {email: '이메일을 인증하세요.'}
      }
      // Check Birth
      if(data['birth'].val !== '') {
        const birth = data['birth']
        if(this._isValid(birth)) {
          const date = new Date(birth.val)
          if(isNaN(date)) {
            return {birth: '올바른 생년월일을 입력하세요.'}
          } else {
            const vdate = birth.val.split('-')
            if(date.getFullYear() !== parseInt(vdate[0]) ||
                date.getMonth() + 1 !== parseInt(vdate[1]) ||
                date.getDate() !== parseInt(vdate[2])) {
              return {birth: '올바른 생년월일을 입력하세요.'}
            }
          }
        } else {
          return {birth: birth.constraint}
        }
      }
      return {}
    },
    _isValid(input) {
      return !('pattern' in input) || new RegExp(input.pattern).test(input.val)
    },
    _checkValidRequiredFields(data) {
      const errors = {}
      for(let key in data) {
        let input = data[key]
        if(input.required && !this._isValid(input)) {
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
      errors = this._checkSeveralFields(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
      errors = this._checkValidRequiredFields(data)
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
        company: data.company.val,
        gender: data.gender.val,
        birth: data.birth.val.length === 0 ? null : data.birth.val
      }
      try {
        await this.$api("POST", "/signup", newUser)
        const result = await this.$store.dispatch("login", {id: data.id.val, pw: data.pw.val})
        if(result) {
          const msg = '회원가입이 정상적으로 완료되었습니다.'
          this.$processMessenger(msg, `/artist/${this.$store.getters.userId}`, {signup: 1})
        } else {
          alert('오류가 발생하였습니다.')
          this.$router.push('/signup')
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
              errors.id = "사용할 수 없는 아이디입니다."
            }
            if(!response['Id enable']) {
              errors.id = "사용할 수 없는 아이디입니다."
            }
            if(!response['Compnay validation']) {
              errors.company = "올바르지 않은 회원종류입니다."
            }
            if(!response['Gender validation']) {
              errors.gender = "올바르지 않은 성별입니다."
            }
            throw errors
          }
        }
      }
    }
  },
  created() {
    this.agreements !== 'true' && this.$handleWrongAccess('/signup')
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
    text-align: left;
    color: red;
    word-break: keep-all;
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