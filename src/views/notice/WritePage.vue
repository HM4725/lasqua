<template>
  <form class="write-page" @submit.prevent="submit">
    <input-box class="title-input-box" type="text" id="title" placeholder="공지사항 제목" 
      focus @input="v=>title=v"/>
    <ckeditor ref="editor" @write="v=>content=v"/>
    <footer class="write-page-buttons">
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
  name: 'notice.writePage',
  components: {
    InputBox,
    Ckeditor,
    DefaultButton
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      this.content = this.$refs.editor.getValue()
      console.log('submit')
    },
    cancel() {
      console.log('cancel')
    }
  }
}
</script>

<style>
  form.write-page {
    width: 100%;
    padding: 0 1.5rem;
  }
  .title-input-box {
    margin-bottom: 1.5rem;
  }
  footer.write-page-buttons {
    margin: 1.5rem 0;
    text-align: right;
  }
  footer.write-page-buttons > button {
    margin-left: 1rem !important;
  }
</style>