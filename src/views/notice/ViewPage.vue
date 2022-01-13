<template>
  <div class="view-page">
    <ckeditor disabled :editor="editor" v-model="editorData" :config="editorConfig" />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'

export default{
  name: 'notice.viewPage',
  components: {
    ckeditor: CKEditor.component
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
}
</script>

<style>
  div.view-page {
    width: 100%;
    padding: 1.5rem;
  }
  .ck-content {
    width: 100%;
    min-height:500px;
  }
  .ck.ck-toolbar {
    display: none !important;
  }
</style>