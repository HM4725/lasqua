<template>
  <form class="modify-page" @submit.prevent="submit">
    <input-box class="title-input-box" type="text" id="title"
      placeholder="공지사항 제목" focus v-model="title"/>
    <editor-box v-model="content"/>
    <footer class="modify-page-buttons">
      <default-button class="button" value="취소" @click.prevent="cancel"/>
      <default-button class="button" type="submit" value="작성"/>
    </footer>
  </form>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import EditorBox from '@/components/form/EditorBox.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'notice.modify.page',
  components: {
    InputBox,
    EditorBox,
    DefaultButton
  },
  props: {
    data: {
      type: String,
      default: '{"error": true}'
    }
  },
  data() {
    return {
      no: 0,
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
          const payload = {no: this.no, title: this.title, content: this.content}
          await this.$api('PUT', '/notice', payload)
          this.$router.push(`/notice/view?no=${this.no}`)
        } catch(error) {
          console.error(error)
        }
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  },
  created() {
    const target = JSON.parse(this.data)
    if(target.error || this.$store.getters.userRole !== 'admin') {
      this.$handleWrongAccess('/notice')
    }
    this.no = target.no
    this.title = target.title
    this.content = target.content
  }
}
</script>

<style>
  form.modify-page {
    width: 100%;
    padding: 0 24px;
  }
  .title-input-box {
    margin-bottom: 24px;
  }
  footer.modify-page-buttons {
    padding: 16px 0;
    text-align: right;
  }
  footer.modify-page-buttons > .button {
    margin-left: 16px;
  }
  @media (max-width: 767px) {
    form.modify-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>