<template>
  <ckeditor @input="write" :editor="editor" v-model="editorData" :config="editorConfig"/>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'

export default{
  name: 'CKEditor',
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
      }
    }
  },
  methods: {
    write() {
      this.$emit('write', this.editorData)
    }
  }
}
</script>

<style>
.ck-content {
  width: 100%;
  min-height:500px;
}
</style>