<template>
  <div class="account-page">
    <h1>
      개인정보 수정 <span class="user-type">({{userType}})</span>
    </h1>
    <section class="modify-info">
      <div class="modify-info-id-wrapper">
        <div class="modify-info-id">
          <input-box class="box" id="modify-id" type="text" placeholder="아이디"
            :value="id.val" disabled/>
          <default-button class="button hidden" value="숨김"/>
        </div>
      </div>
      <div class="modify-info-pw-wrapper">
        <div class="modify-info-pw">
          <input-box class="box" id="modify-pw" type="password" :placeholder="pwPlaceholder"
            :value="pw.val" :disabled="!pw.modify"
            @input="v=>pw.val=v" ref="pw"/>
          <default-button class="button" :value="pw.button" @click="modify('pw')"/>
        </div>
        <section class="modify-info-pw-sub">
          <transition name="slide-down">
            <div v-show="pw.modify">
              <div class="modify-info-pw-new">
                <input-box class="box" id="modify-pw-new" type="password"
                  placeholder="신규 비밀번호" @input="v=>pw.new=v"
                  ref="pwNew"/>
                <default-button class="button" value="취소" @click="cancelPw"/>
              </div>
              <div class="modify-info-pw-new">
                <input-box class="box" id="modify-pw-new-confirm" type="password"
                  placeholder="비밀번호 확인" @input="v=>pw.confirm=v"
                  ref="pwConfirm"/>
                <default-button class="button hidden" value="숨김"/>
              </div>
              <div class="error" v-show="pw.msg">{{pw.msg}}</div>
            </div>
          </transition>
        </section>
      </div>
      <div class="modify-info-name-wrapper">
        <div class="modify-info-name">
          <input-box class="box" id="modify-name" type="text" placeholder="이름"
            :value="name.val" :disabled="!name.modify" 
            @input="v=>name.val=v"/>
          <default-button class="button" :value="name.button" @click="modify('name')"/>
        </div>
        <section class="modify-info-name-sub">
          <transition name="slide-down">
            <div class="error" v-show="name.msg">{{name.msg}}</div>
          </transition>
        </section>
      </div>
      <div class="modify-info-email-wrapper">
        <div class="modify-info-email">
          <input-box class="box" id="modify-email" type="text" placeholder="이메일"
            :value="email.val" :disabled="!email.modify" 
            @input="v=>email.val=v"/>
          <default-button class="button" :value="email.button" @click="modify('email')"/>
        </div>
        <section class="modify-info-email-sub">
          <transition name="slide-down">
            <div class="error" v-show="email.msg">{{email.msg}}</div>
          </transition>
        </section>
      </div>
      <div class="modify-info-phone-wrapper">
        <div class="modify-info-phone">
          <input-box class="box" id="modify-phone" type="text" placeholder="전화번호"
            :value="phone.val" :disabled="!phone.modify"
            @input="v=>phone.val=v"/>
          <default-button class="button" value="수정" @click="modify('phone')"/>
        </div>
        <section class="modify-info-phone-sub">
          <transition name="slide-down">
            <div class="error" v-show="phone.msg">{{phone.msg}}</div>
          </transition>
        </section>
      </div>
      <div class="modify-info-withdrawal">
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
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'

export default{
  name: 'user.account.page',
  components: {
    InputBox,
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
        constraint: '[영문, 숫자, 특수문자]를 모두 포함 & 8 ~ 20 글자 수 제한',
        button: '수정',
        msg: '',
        modify: false,
        new: '',
        confirm: '',
      },
      name: {
        val: '',
        pattern: '^[가-힣a-zA-Z]{1,10}$',
        constraint: '10글자 이하 제한, 공백 및 특수문자 사용 불가',
        button: '수정',
        msg: '',
        modify: false
      },
      email: {
        val: '',
        pattern: '^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$',
        constraint: 'email 양식 제한',
        button: '수정',
        msg: '',
        modify: false
      },
      phone: {
        val: '',
        pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$',
        constraint: '{2~3자리 숫자}-{3~4자리 숫자}-{4자리 숫자}',
        button: '수정',
        msg: '',
        modify: false
      },
      company: 'N',
      gender: 'N',
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
      if(target.modify) {
        if(v === 'pw') {
          if(await this.changePassword()) {
            target.modify = false
            this.$refs.pw.write('00000000')
            this.$refs.pwNew.write('')
            this.$refs.pwConfirm.write('')
            target.button = '수정'
            target.msg = ''
          }
        } else {
          if(await this.changeProperty(v)) {
            target.modify = false
            target.button = '수정'
            target.msg = ''
          }
        }
      } else {
        if(v === 'pw') {
          this.$refs.pw.write('')
          this.$refs.pwNew.write('')
          this.$refs.pwConfirm.write('')
        }
        target.modify = true
        target.button = '저장'
      }
    },
    cancelPw() {
      this.pw.modify = false
      this.$refs.pw.write('00000000')
      this.$refs.pwNew.write('')
      this.$refs.pwConfirm.write('')
      this.pw.button = '수정'
      this.pw.msg = ''
    },
    withdrawal() {
      this.$router.push({name: 'user.withdrawal'})
    },
    // VUEX API
    async changeProperty(v) {
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
    async changePassword() {
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
    },
    // Private Methods
    _isValid(target) {
      return new RegExp(target.pattern).test(target.val)
    },
  },
  created() {
    const user = this.$store.getters.userInformation
    this.id.val = user.id
    this.pw.val = '00000000'
    this.name.val = user.name
    this.email.val = user.email
    this.phone.val = user.phone
    this.company = user.company
    this.gender = user.gender
    this.role = user.role
  }
}
</script>

<style scoped>
  .account-page {
    width: 20rem;
  }
  span.user-type {
    font-weight: normal;
    font-size: 1.2rem;
  }
  .modify-info > div {
    margin-bottom: 16px;
  }
  .modify-info > div > div{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .modify-info > div > section {
    overflow: hidden;
  }
  .modify-info > div > section > div {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .modify-info-pw-new {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .modify-info-withdrawal {
    text-align: right;
    margin-top: 8px;
  }
  .modify-info-withdrawal > a {
    font-size: .8rem;
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
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  }
  .slide-down-enter-from,
  .slide-down-leave-active {
    opacity: 0;
    transform: translateY(-50%);
  }
</style>