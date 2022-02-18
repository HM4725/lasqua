<template>
  <div class="account-page">
    <h1>
      개인정보 수정 <span class="user-type">({{userType}})</span>
    </h1>
    <section class="modify-info">
      <div class="modify-field">
        <div class="input-with-button">
          <input-box class="box" id="modify-id" type="text" placeholder="아이디"
            :value="id.val" disabled/>
          <default-button class="button hidden" value="숨김"/>
        </div>
      </div>
      <form class="modify-field" @submit.prevent="modify('pw')" method="POST">
        <div class="input-with-button">
          <input-box class="box" id="modify-pw" type="password" :placeholder="pwPlaceholder"
            :value="pw.val" :disabled="!pw.modify" tabindex="1" autocomplete="off"
            @input="v=>pw.val=v" ref="pw"/>
          <default-button class="button" :value="pw.button" type="submit" tabindex="4"/>
        </div>
        <section class="modify-info-pw-sub">
          <transition name="slide-down">
            <div v-show="pw.modify">
              <div class="input-with-button">
                <input-box class="box" id="modify-pw-new" type="password"
                  placeholder="신규 비밀번호" @input="v=>pw.new=v"
                  autocomplete="off" ref="pwNew" tabindex="2"/>
                <default-button class="button" value="취소" @click="close('pw')"
                  type="button" tabindex="5"/>
              </div>
              <div class="input-with-button">
                <input-box class="box" id="modify-pw-new-confirm" type="password"
                  placeholder="비밀번호 확인" @input="v=>pw.confirm=v"
                  autocomplete="off" ref="pwConfirm" tabindex="3"/>
                <default-button class="button hidden" value="숨김"/>
              </div>
              <p class="error" v-show="pw.msg">{{pw.msg}}</p>
            </div>
          </transition>
        </section>
      </form>
      <form class="modify-field" @submit.prevent="modify('name')" method="POST">
        <div class="input-with-button">
          <input-box class="box" id="modify-name" type="text" placeholder="이름"
            :value="name.val" :disabled="!name.modify" tabindex="6"
            @input="v=>name.val=v"/>
          <default-button class="button" :value="name.button" type="submit" tabindex="7"/>
        </div>
        <section class="modify-info-name-sub">
          <transition name="slide-down">
            <p class="error" v-show="name.msg">{{name.msg}}</p>
          </transition>
        </section>
      </form>
      <form class="modify-field" @submit.prevent="modify('email')" method="POST">
        <div class="input-with-button">
          <input-box class="box" id="modify-email" type="text" placeholder="이메일"
            :value="email.val" :disabled="!email.modify||email.check" tabindex="8"
            @input="v=>email.val=v" ref="email"/>
          <default-button class="button" :value="email.button" type="submit" tabindex="10"/>
        </div>
        <section class="modify-info-email-sub">
          <transition name="slide-down">
            <div v-show="email.modify">
              <div class="input-with-button">
                <input-box class="box" id="modify-email-check" type="text"
                  placeholder="인증번호" @input="v=>email.number=v" tabindex="9"
                  :disabled="!email.check" ref="emailCheck"/>
                <default-button class="button" value="취소" @click="close('email')"
                  type="button" tabindex="11"/>
              </div>
              <p class="error">{{email.msg}}</p>
            </div>
          </transition>
        </section>
      </form>
      <form class="modify-field" @submit.prevent="modify('phone')" method="POST">
        <div class="input-with-button">
          <input-box class="box" id="modify-phone" type="text" placeholder="전화번호"
            :value="phone.val" :disabled="!phone.modify" subplaceholder="예) 010-0000-0000"
            @input="v=>phone.val=v" tabindex="12"/>
          <default-button class="button" :value="phone.button" type="submit" tabindex="13"/>
        </div>
        <section class="modify-info-phone-sub">
          <transition name="slide-down">
            <p class="error" v-show="phone.msg">{{phone.msg}}</p>
          </transition>
        </section>
      </form>
      <form v-if="userType==='일반회원'"
          class="modify-field" @submit.prevent="modify('birth')" method="POST">
        <div class="input-with-button">
          <input-box class="box" id="modify-birth" type="text" placeholder="생년월일 (선택)"
            :value="birth.val" :disabled="!birth.modify" subplaceholder="예) 2000-01-01"
            @input="v=>birth.val=v" tabindex="14"/>
          <default-button class="button" :value="birth.button" type="submit" tabindex="15"/>
        </div>
        <section class="modify-info-birth-sub">
          <transition name="slide-down">
            <p class="error" v-show="birth.msg">{{birth.msg}}</p>
          </transition>
        </section>
      </form>
      <form v-if="userType==='일반회원'"
          class="modify-field" @submit.prevent="modify('gender')" method="POST">
        <div class="input-with-button">
          <radio-box id="modify-gender" title="성별" :options="gender.options"
            :value="gender.val" :disabled="!gender.modify" @change="v=>gender.val=v"/>
          <default-button class="button" :value="gender.button" type="submit" tabindex="13"/>
        </div>
        <section class="modify-info-gender-sub">
          <transition name="slide-down">
            <p class="error" v-show="gender.msg">{{gender.msg}}</p>
          </transition>
        </section>
      </form>
      <div class="modify-field withdrawal">
        <a class="wide-click" @click="withdrawal">회원탈퇴 바로가기</a>
      </div>
    </section>
    <footer>
      <router-button value="홈으로" :link="`/artist/${this.id.val}`"/>
    </footer>
  </div>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import RadioBox from '@/components/form/RadioBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'

export default{
  name: 'user.account.page',
  components: {
    InputBox,
    RadioBox,
    DefaultButton,
    RouterButton
  },
  data() {
    return {
      id: {
        val: ''
      },
      pw: {
        val: '',
        pattern: '^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!-/:-@\\[-`{-~]).{8,20}$',
        constraint: '영문, 숫자와 특수문자를 모두 포함하며, 8 ~ 20자 이내여야 합니다.',
        button: '수정',
        msg: '',
        modify: false,
        new: '',
        confirm: '',
        required: true
      },
      name: {
        val: '',
        pattern: '^[가-힣a-zA-Z]{1,10}$',
        constraint: '공백 및 특수문자 사용 불가하며, 10자 이내여야 합니다.',
        button: '수정',
        msg: '',
        modify: false,
        required: true
      },
      email: {
        val: '',
        oldVal: '',
        pattern: '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
        constraint: '올바른 이메일을 입력하세요.',
        button: '수정',
        msg: '',
        number: '',
        check: true,
        modify: false,
        required: true
      },
      phone: {
        val: '',
        pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$',
        constraint: '올바른 형식으로 입력하세요.',
        button: '수정',
        msg: '',
        modify: false,
        required: true
      },
      birth: {
        val: '',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        constraint: '올바른 형식으로 입력하세요.',
        button: '수정',
        msg: '',
        modify: false,
        required: false
      },
      gender: {
        options: {M: '남자', F: '여자', N: '그 외'},
        val: 'N',
        button: '수정',
        msg: '',
        modify: false,
        required: false
      },
      company: 'N',
      role: '',
      init: false
    }
  },
  computed: {
    userType() {
      if(this.role === 'admin') {
        return '관리자'
      } else {
        return this.company === 'N' ? '일반회원' : '기업회원'
      }
    },
    pwPlaceholder() {
      return this.pw.modify ? '현재 비밀번호' : '비밀번호'
    }
  },
  methods: {
    // Event API
    async modify(v) {
      const target = this.$data[v]
      if(!target.modify) {
        this._modifyInit(v, target)
      } else {
        await this._modifyLogic(v, target)
      }
    },
    close(v, target) {
      if(!target) {
        target = this.$data[v]
      }
      if(v === 'pw') {
        this.$refs.pw.write('00000000')
        this.$refs.pwNew.write('')
        this.$refs.pwConfirm.write('')
      } else if(v === 'email') {
        this.$refs.email.write(target.oldVal)
      }
      target.modify = false
      target.button = '수정'
      target.msg = ''
    },
    withdrawal() {
      this.$router.push({name: 'user.withdrawal'})
    },
    // Private API
    _modifyInit(v, target) {
      if(v === 'pw') {
        this.$refs.pw.write('')
        this.$refs.pwNew.write('')
        this.$refs.pwConfirm.write('')
        target.button = '확인'
      } else if(v === 'email') {
        this.$refs.emailCheck.write('')
        this.email.oldVal = this.email.val
        this.email.check = false
        target.button = '인증'
      } else {
        target.button = '확인'
      }
      target.modify = true
    },
    async _modifyLogic(v, target) {
      if(target.required) {
        if(target.val.length > 0) {
          if(v === 'pw') {
            if(await this._changePassword()) {
              this.close(v, target)
            }
          } else if(v === 'email') {
            if(await this._authMail()) {
              if(await this._changeProperty(v)) {
                target.oldVal = target.val
                this.close(v, target)
              }
            }
          } else {
            if(await this._changeProperty(v)) {
              this.close(v, target)
            }
          }
        } else {
          target.msg = '올바르게 입력해주세요.'
        }
      } else {
        if(target.val.length === 0) {
          target.val = null
        }
        if(v === 'birth') {
          if(this._validateBirth(target)) {
            if(await this._changeProperty(v)) {
              this.close(v, target)
            }
          }
        } else {
          if(await this._changeProperty(v)) {
            this.close(v, target)
          }
        }
      }
    },
    // Email methods
    async _authMail() {
      if(!this.email.check) { // 1. Send mail
        if(this._isValid(this.email)) {
          this.email.check = true
          this.email.button = '확인'
          if(!await this._sendCheckMail()) {
            this.email.check = false
            this.email.button = '인증'
          }
        } else {
          this.email.msg = this.email.constraint
        }
        return false
      } else { // 2. Check mail
        if(await this._checkMailNumber()) {
          return true
        } else {
          this.email.msg = '인증 번호가 일치하지 않습니다.'
          return false
        }
      }
    },
    async _sendCheckMail() {
      try {
        this.email.msg = '해당 메일로 인증번호를 보냈습니다.'
        await this.$api('POST', '/mail?val=sign', {email: this.email.val})
        return true
      } catch(error) {
        const status = error.response.status
        if(status === 400) {
          this.email.msg = '인증 메일 발송에 오류가 발생하였습니다.'
        } else if(status === 406) {
          this.email.msg = '이미 사용 중인 이메일입니다.'
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
        return true
      } catch(error) {
        return false
      }
    },
    // Birth methods
    _validateBirth(birth) {
      if(!this._isValid(birth)) {
        birth.msg = birth.constraint
        return false
      } else if(birth.val === null) {
        return true
      }
      const date = new Date(birth.val)
      const vdate = birth.val.split('-')
      const valid = !isNaN(date) &&
        date.getFullYear() === parseInt(vdate[0]) &&
        date.getMonth() + 1 === parseInt(vdate[1]) &&
        date.getDate() === parseInt(vdate[2])
      if(valid) {
        return true
      } else {
        birth.msg = '올바른 생년월일을 입력하세요.'
        return false
      }
    },
    // Common methods
    _isValid(target) {
      if(target.required) {
          return new RegExp(target.pattern).test(target.val)
      } else {
        if(target.val !== null && target.val.length > 0) {
          return new RegExp(target.pattern).test(target.val)
        } else {
          return true
        }
      }
    },
    // VUEX API
    async _changeProperty(v) {
      const target = this.$data[v]
      if(this._isValid(target)) {
        const success = await this.$store.dispatch('modify', {[v]: target.val})
        target.msg = success ? '' : target.constraint
        return success
      } else {
        target.msg = target.constraint
        return false
      }
    },
    async _changePassword() {
      if(this.pw.val === this.pw.new) {
        this.pw.msg = '신규 비밀번호가 현재와 동일합니다.'
        return false
      } else if(new RegExp(this.pw.pattern).test(this.pw.new) === false) {
        this.pw.msg = this.pw.constraint
      } else if(this.pw.new !== this.pw.confirm) {
        this.pw.msg = '신규 비밀번호가 비밀번호 확인과 일치하지 않습니다.'
        return false
      } else {
        const payload = {
          now: this.pw.val,
          pw: this.pw.new
        }
        const success = await this.$store.dispatch('changePassword', payload)
        this.pw.msg = success ? '' : '현재 비밀번호가 올바르지않습니다.'
        return success
      }
    }
  },
  created() {
    const user = this.$store.getters.userInformation
    this.id.val = user.id
    this.pw.val = '00000000'
    this.name.val = user.name
    this.email.val = user.email
    this.phone.val = user.phone
    this.company = user.company
    this.gender.val = user.gender
    this.birth.val = user.birth === null ? '' : user.birth
    this.role = user.role
  }
}
</script>

<style scoped>
  .account-page {
    width: 300px;
  }
  span.user-type {
    font-weight: normal;
    font-size: .7em;
  }
  .modify-info > .modify-field {
    margin-bottom: 16px;
  }
  .input-with-button {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .modify-info > .modify-field > section {
    overflow: hidden;
  }
  .modify-info > .modify-field > section > div {
    margin-top: 8px;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
  .modify-field.withdrawal {
    text-align: right;
    margin-top: 8px;
  }
  .modify-field.withdrawal > a {
    font-size: .8em;
    color: #444444;
  }
  .modify-info .button {
    margin-left: 16px;
    padding: 8px;
    height: 40px;
    min-height: 0;
  }
  .modify-info .hidden {
    visibility: hidden;
  } 
  .modify-info .error { 
    text-align: left;
    color: red;
    word-break: keep-all;
  }
  .account-page > footer {
    padding: 16px;
  }
  @media (max-width: 767px) {
    .modify {
      width: 100%;
      padding: var(--mobile-padding-size);
    }
    .modify-info {
      flex-direction: column;
      width: 100%;
    }
  }
  .slide-down-enter-active {
    transition: opacity 0.3s cubic-bezier(.7,0,1,.3), 
      transform 0.3s cubic-bezier(0,.7,.3,1);
  }
  .slide-down-leave-active {
    transition: opacity 0.3s cubic-bezier(0,.7,.3,1), 
      transform 0.3s cubic-bezier(.7,0,1,.3);
  }
  .slide-down-enter-from,
  .slide-down-leave-active {
    opacity: 0;
    transform: translateY(-50%);
  }
</style>