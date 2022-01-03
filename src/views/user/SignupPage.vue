<template>
  <div>
    <form class="signup" @submit.prevent="submit" method="POST">
      <div class="signup-info">
        <div class="necessary">
          <p class="f-title">필수 사항</p>
          <input-box id="signup-id" type="text" placeholder="아이디" autocomplete="username" @input="v=>{id.val=v}" @focus="clearBox(id)"/>
          <span class="message">{{id.msg}}</span>
          <input-box id="signup-pw" type="password" placeholder="비밀번호" autocomplete="new-password" @input="v=>{pw.val=v}" @focus="clearBox(pw)"/>
          <span class="message">{{pw.msg}}</span>
          <input-box id="signup-confirmPw" type="password" placeholder="비밀번호 확인" autocomplete="new-password" @input="v=>{confirmPw.val=v}" @focus="clearBox(confirmPw)"/>
          <span class="message">{{confirmPw.msg}}</span>
          <input-box id="signup-name" type="text" placeholder="이름" @input="v=>{name.val=v}" @focus="clearBox(name)"/>
          <span class="message">{{name.msg}}</span>
          <input-box id="signup-email" type="text" placeholder="이메일" @input="v=>{email.val=v}" @focus="clearBox(email)"/>
          <span class="message">{{email.msg}}</span>
          <input-box id="signup-phone" type="tel" placeholder="전화번호" @input="v=>{tel.val=v}"  @focus="clearBox(tel)"/>
          <span class="message">{{tel.msg}}</span>
        </div>
        <div class="optional">
          <p class="f-title">선택 사항</p>
          <radio-box id="signup-company" title="회원 구분" :options="company.options" :checked="company.checked" ref="company"/>
          <radio-box id="signup-gender" title="성별" :options="gender.options" :checked="gender.checked" ref="gender"/>
          <date-box id="signup-regdate" placeholder="생년월일" ref="birth"/>
        </div>
      </div>
      <div>
        <default-button type="submit" value="회원가입"/>
      </div>
    </form>
  </div>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import RadioBox from '@/components/form/RadioBox.vue'
import DateBox from '@/components/form/DateBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: "user/SignupPage",
  components: {
    InputBox,
    RadioBox,
    DateBox,
    DefaultButton
  },
  data() {
    return {
      id: {
        val: '',
        pattern: '^[0-9a-zA-Z]{4,15}$',
        constraint: '[영문, 숫자]만 허용 & 4 ~ 15 글자 수 제한',
        msg: '',
        required: true
      },
      pw: {
        val: '',
        pattern: '^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!-/:-@\\[-`{-~]).{8,20}$',
        constraint: '[영문, 숫자, 특수문자]를 모두 포함 & 8 ~ 20 글자 수 제한',
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
        pattern: '^[가-힣a-zA-Z]{1,10}$',
        constraint: '10글자 이하 제한, 공백 및 특수문자 사용 불가',
        msg: '',
        required: true
      },
      email: {
        val: '',
        pattern: '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
        constraint: 'email 양식 제한',
        msg: '',
        required: true
      },
      tel: {
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
    clearBox(target) {
      target.msg = ''
    },
    async submit() {
      try {
        this.validation(this.$data)
        await this.signup(this.$data)
      } catch(errors) {
        for(let key in errors) {
          this.$data[key].msg = errors[key]
        }
      }
    },
    checkVacantFields(data) {
      const errors = {}
      for(let key in data) {
        let input = data[key]
        if(input.required && input.val.length === 0) {
          errors[key] = "필수 사항입니다."
        }
      }
      return errors
    },
    checkConfirmPw(data) {
      const errors = {}
      if(data['pw'].val !== data['confirmPw'].val) {
        errors['confirmPw'] = '비밀번호가 일치하지 않습니다.'
      }
      return errors
    },
    isValidate(input) {
      return !('pattern' in input) || new RegExp(input.pattern).test(input.val)
    },
    checkValidFields(data) {
      const errors = {}
      for(let key in data) {
        let input = data[key]
        if(!this.isValidate(input)) {
          errors[key] = input.constraint
        }
      }
      return errors
    },
    validation(data) {
      let errors
      errors = this.checkVacantFields(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
      errors = this.checkConfirmPw(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
      errors = this.checkValidFields(data)
      if(Object.keys(errors).length !== 0) {
        throw errors
      }
    },
    async signup(data) {
      const newUser = {
        id: data.id.val, 
        pw: data.pw.val,
        name: data.name.val,
        email: data.email.val,
        phone: data.tel.val,
        company: this.$refs.company.getValue(),
        gender: this.$refs.gender.getValue(),
        birth: this.$refs.birth.getValue()
      }
      try {
        await this.$api("POST", "/signup", newUser)
        const result = await this.$store.dispatch("login", {id: data.id.val, pw: data.pw.val})
        if(result) {
          this.$router.push('/mypage')
        } else {
          console.error('fail')
        }
      } catch(e) {
        if(e.response) {
          const response = e.response.data
          if('Required fields missing' in response) {
            throw this.checkVacantFields(data)
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
              errors.tel = data.tel.constraint
            }
            if(!response['Id Unique']) {
              errors.id = "중복된 아이디입니다."
            }
            throw errors
          }
        }
      }
    },
  }
}
</script>

<style scoped>
  .signup {
    display: flex;
    flex-direction: column;
  }
  .signup-info {
    display: flex;
    flex-direction :row;
    width: 30rem;
  }
  .signup-info > div {
    margin: 1rem;
    flex: 1;
  }
  .signup-info > div > * {
    margin: .5rem 0;
  }
  .message {
    color: red;
  }
</style>