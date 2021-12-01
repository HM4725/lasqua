<template>
  <div>
    <form class="signup">
      <div class="signup-info">
        <div class="necessary">
          <p class="f-title">필수 사항</p>
          <input-box id="signup-id" type="text" placeholder="아이디" ref="id"/>
          <input-box id="signup-pw" type="password" placeholder="비밀번호" ref="pw"/>
          <input-box id="signup-confirmPw" type="password" placeholder="비밀번호 확인" ref="confirmPw"/>
          <input-box id="signup-name" type="text" placeholder="이름" ref="name"/>
          <input-box id="signup-email" type="email" placeholder="이메일" ref="email"/>
          <input-box id="signup-phone" type="tel" placeholder="전화번호" ref="phone"/>
        </div>
        <div class="optional">
          <p class="f-title">선택 사항</p>
          <radio-box id="signup-company" title="회원 구분" :options="company.options" :checked="company.checked" ref="company"/>
          <radio-box id="signup-gender" title="성별" :options="gender.options" :checked="gender.checked" ref="gender"/>
          <input-box id="signup-regdate" type="date" placeholder="생년월일" ref="birth"/>
          <input-box id="signup-info" type="text" placeholder="간단한 소개" ref="info"/>
          <input-box id="signup-facebook" type="text" placeholder="페이스북 ID" ref="facebook"/>
          <input-box id="signup-instagram" type="text" placeholder="인스타그램 ID" ref="instagram"/>
          <input-box id="signup-twitter" type="text" placeholder="트위터 ID" ref="twitter"/>
          <input-box id="signup-etc_name" type="text" placeholder="기타 SNS ID" ref="etcName"/>
          <input-box id="signup-etc_link" type="text" placeholder="기타 SNS 링크" ref="etcLink"/>
        </div>
      </div>
      <div>
        <default-button @click="signup" value="회원가입"/>
      </div>
    </form>
  </div>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import RadioBox from '@/components/form/RadioBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  components: {
    InputBox,
    RadioBox,
    DefaultButton
  },
  data() {
    return {
      gender: {
        options: {M: '남자', F: '여자', N: '그 외'},
        checked: 'N'
      },
      company: {
        options: {Y: '기업회원', N: '일반회원'},
        checked: 'N'
      },
      error: false
    }
  },
  methods: {
    async signup(e) {
      e.preventDefault()
      this.error = false;
      const newUser = {
        id: this.$refs.id.getValue(), 
        pw: this.$refs.pw.getValue(),
        name: this.$refs.name.getValue(),
        email: this.$refs.email.getValue(),
        phone: this.$refs.phone.getValue(),
        company: this.$refs.company.getValue(),
        gender: this.$refs.gender.getValue(),
        birth: this.$refs.birth.getValue(),
        info: this.$refs.info.getValue(),
        facebook: this.$refs.facebook.getValue(),
        instagram: this.$refs.instagram.getValue(),
        twitter: this.$refs.twitter.getValue(),
        etc_name: this.$refs.etcName.getValue(),
        etc_link: this.$refs.etcLink.getValue()
      }
      try {
        await this.$api("POST", "/signup", newUser)
        this.$router.push({name: 'Message', params: {message: "회원가입 성공", redirect: "/login"}})
      } catch(error) {
        alert('오류가 발생하였습니다.')
        console.log(error)
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
  }
  .signup-info > div {
    margin: 1rem;
  }
  .signup-info > div > * {
    margin: .5rem 0;
  }
</style>