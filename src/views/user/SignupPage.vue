<template>
  <div>
    <form class="signup">
      <div class="necessary">
        <p class="f-title">필수 사항</p>
        <input-box id="id" type="text" placeholder="아이디"/>
        <input-box id="pw" type="password" placeholder="비밀번호"/>
        <input-box id="pw" type="password" placeholder="비밀번호 확인"/>
        <input-box id="name" type="text" placeholder="이름"/>
        <input-box id="email" type="email" placeholder="이메일"/>
        <input-box id="phone" type="tel" placeholder="전화번호" />
      </div>
      <div class="optional">
        <p class="f-title">선택 사항</p>
        <radio-box id="sex" title="성별" :options="sex.options" :checked="sex.checked"/>
        <radio-box id="company" title="구분" :options="company.options" :checked="company.checked"/>
        <input-box id="birth" type="date" placeholder="생년월일"/>
        <input-box id="info" type="text" placeholder="간단한 소개"/>
        <input-box id="facebook" type="text" placeholder="페이스북 ID"/>
        <input-box id="instagram" type="text" placeholder="인스타그램 ID"/>
        <input-box id="twitter" type="text" placeholder="트위터 ID"/>
        <input-box id="etc_name" type="text" placeholder="기타 SNS ID"/>
        <input-box id="etc_link" type="text" placeholder="기타 SNS 링크"/>
      </div>
    </form>
  </div>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import RadioBox from '@/components/form/RadioBox.vue'

export default{
  components: {
    InputBox,
    RadioBox
  },
  data() {
    return {
      sex: {
        options: {M: '남자', F: '여자', N: '그 외'},
        checked: 'N'
      },
      company: {
        options: {Y: '기업회원', N: '일반회원'},
        checked: 'N'
      }
    }
  }
}
</script>

<style scoped>
  .signup {
    display: flex;
    flex-direction: row;
  }
  .signup > div {
    margin: 1rem;
  }
  .signup > div > * {
    margin: .5rem 0;
  }
</style>