<template>
  <div>
    <ckeditor disabled :editor="editor" v-model="editorData" :config="editorConfig"/>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'

export default{
  name: 'notice.viewer',
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    content: String
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        toolbar: {items: [],},
        table: {
          contentToolbar: []
        }
      }
    }
  },
  created() {
    this.editorData = this.content
  }
}
</script>

<style>
  .ck-content {
    width: 100%;
    min-height:500px;
  }
  .ck.ck-toolbar {
    display: none !important;
  }
</style>