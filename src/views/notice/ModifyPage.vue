<template>
  <form class="modify-page" @submit.prevent="submit">
    <input-box class="title-input-box" type="text" id="title" placeholder="공지사항 제목" 
      focus @input="v=>title=v" :value="title"/>
    <ckeditor ref="editor" @write="v=>content=v" :content="content"/>
    <footer class="modify-page-buttons">
      <default-button type="click" value="취소" @click.prevent="cancel"/>
      <default-button type="submit" value="작성"/>
    </footer>
  </form>
</template>

<script>
import InputBox from '@/components/form/InputBox.vue'
import Ckeditor from '@/components/form/CKEditor.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'notice.modify.page',
  components: {
    InputBox,
    Ckeditor,
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
      try {
        const payload = {no: this.no, title: this.title, content: this.content}
        await this.$api('PUT', '/notice', payload)
        this.$router.go(-1)
      } catch(error) {
        console.error(error)
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
    padding: 0 1.5rem;
  }
  .title-input-box {
    margin-bottom: 1.5rem;
  }
  footer.modify-page-buttons {
    padding: 1rem 0;
    text-align: right;
  }
  footer.modify-page-buttons > button {
    margin-left: 1rem !important;
  }
  @media (max-width: 767px) {
    form.modify-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>