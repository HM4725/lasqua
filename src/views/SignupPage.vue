<template>
  <div>
    <form>
      <input-box title="아이디" type="text"/>
      <input-box title="비밀번호" type="password"/>
      <input-box title="이름" type="text"/>
      <input-box title="이메일" type="email"/>
      <input-box title="전화번호" type="tel"/>
      <span>Optional</span>
      <input-box title="생년월일" type="date"/>
      <input-box title="자기소개" type="text"/>
      <input-box title="페이스북" type="text"/>
      <input-box title="인스타그램" type="text"/>
      <input-box title="트위터" type="text"/>
      <input-box title="기타SNSID" type="text"/>
      <input-box title="기타SNSLink" type="text"/>
    </form>
  </div>
</template>

<script>
import InputBox from '@/components/common/InputBox.vue'

export default{
  components: {
    InputBox
  }
}
</script>

<style scoped>

</style>