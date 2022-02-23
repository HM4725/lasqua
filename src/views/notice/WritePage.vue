<template>
  <form class="write-page" @submit.prevent="submit">
    <input-box class="title-input-box" type="text" id="title"
      placeholder="공지사항 제목" v-model="title" focus/>
    <editor-box v-model="content"/>
    <footer class="write-page-buttons">
      <default-button value="취소" @click.prevent="cancel"/>
      <default-button type="submit" value="작성"/>
    </footer>
  </form>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import EditorBox from '@/components/form/EditorBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'notice.write.page',
  components: {
    InputBox,
    EditorBox,
    DefaultButton
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async submit() {
      if(this.title.trim().length === 0) {
        alert('공지사항 제목을 입력해주세요.')
      } else {
        try {
          const payload = {title: this.title, content: this.content}
          await this.$api('POST', '/notice', payload)
          this.$router.push('/notice')
        } catch(error) {
          console.error(error)
        }
      }
    },
    cancel() {
      this.$router.push('/notice')
    }
  },
  created() {
    if(this.$store.getters.userRole !== 'admin') {
      this.$handleWrongAccess('/notice')
    }
  }
}
</script>

<style>
  form.write-page {
    width: 100%;
    padding: 0 24px;
  }
  .title-input-box {
    margin-bottom: 24px;
  }
  footer.write-page-buttons {
    padding: 16px 0;
    text-align: right;
  }
  footer.write-page-buttons > button {
    margin-left: 16px !important;
  }
  @media (max-width: 767px) {
    form.write-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>