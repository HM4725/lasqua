<template>
  <div class="account-page">
    <h1 v-if="init">개인정보 수정</h1>
    <section class="modify-info" v-if="init">
      <div class="modify-info-id-wrapper">
        <div class="modify-info-id">
          <input-box class="box" id="modify-id" type="text" placeholder="아이디"
            :value="id.val" disabled/>
          <default-button class="button" value="수정"/>
        </div>
      </div>
      <div class="modify-info-pw-wrapper">
        <div class="modify-info-pw">
          <input-box class="box" id="modify-pw" type="password" placeholder="비밀번호"
            :value="pw.val" disabled/>
          <default-button class="button" :value="pw.button" @click="modify('pw')"/>
        </div>
        <section class="modify-info-pw-sub">
          <transition name="slide-down">
            <div v-show="pw.modify">비밀번호 수정</div>
          </transition>
        </section>
      </div>
      <div class="modify-info-name-wrapper">
        <div class="modify-info-name">
          <input-box class="box" id="modify-name" type="text" placeholder="이름"
            :value="name.val" disabled/>
          <default-button class="button" :value="name.button" @click="modify('name')"/>
        </div>
        <section class="modify-info-name-sub">
          <transition name="slide-down">
            <div v-show="name.modify">이름 수정</div>
          </transition>
        </section>
      </div>
      <div class="modify-info-email-wrapper">
        <div class="modify-info-email">
          <input-box class="box" id="modify-email" type="text" placeholder="이메일"
            :value="email.val" disabled/>
          <default-button class="button" :value="email.button" @click="modify('email')"/>
        </div>
        <section class="modify-info-email-sub">
          <transition name="slide-down">
            <div v-show="email.modify">이메일 수정</div>
          </transition>
        </section>
      </div>
      <div class="modify-info-phone-wrapper">
        <div class="modify-info-phone">
          <input-box class="box" id="modify-phone" type="text" placeholder="전화번호"
            :value="phone.val" disabled/>
          <default-button class="button" value="수정" @click="modify('phone')"/>
        </div>
        <section class="modify-info-phone-sub">
          <transition name="slide-down">
            <div v-show="phone.modify">전화번호 수정</div>
          </transition>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'user.account.page',
  components: {
    InputBox,
    DefaultButton
  },
  props: {
    valid: {
      type: String,
      default: 'false'
    }
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
        modify: false
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
      init: false
    }
  },
  methods: {
    // Event API
    modify(v) {
      const target = this.$data[v]
      if(target.modify) {
        this.save(target)
        target.modify = false
        target.button = '수정'
      } else {
        target.modify = true
        target.button = '저장'
      }
    },
    // REST API
    save(target) {
      console.log(target)
    }
  },
  created() {
    if(this.valid !== 'true') {
      this.$router.push({name: 'user.pwauth', params: {page: 'user.account'}})
    } else {
      const user = this.$store.getters.userInformation
      console.log(user)
      this.id.val = user.id
      this.pw.val = '00000000'
      this.name.val = user.name
      this.email.val = user.email
      this.phone.val = user.phone
      this.company = user.company
      this.gender = user.gender
      this.init = true
    }
  }
}
</script>

<style scoped>
  .account-page {
    width: 20rem;
  }
  .modify-info > div {
    margin-bottom: 1rem;
  }
  .modify-info > div > div{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .modify-info > div > div > .button {
    margin-left: 1rem;
    padding: .5rem;
    height: 2.5rem;
    min-height: 0;
  }
  .modify-info-id > .button {
    visibility: hidden;
  }
  .modify-info > div > section {
    border-bottom: 1px solid var(--active-bg-color);
    overflow: hidden;
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
    .modify-info > div {
      margin: 0;
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