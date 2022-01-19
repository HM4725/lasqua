<template>
  <article class="readonly">
    <ckeditor disabled :editor="editor" v-model="editorData" :config="editorConfig"/>
  </article>
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
      editorData: '',
      editorConfig: {
        toolbar: {items: [],},
        removePlugins: ['TableContentToolbar'],
      }
    }
  },
  watch: {
    content(val) {
      this.editorData = val
    }
  }
}
</script>

<style>
  article.readonly .ck-content {
    width: 100%;
    min-height:500px;
  }
  article.readonly .ck.ck-toolbar {
    display: none !important;
  }
  article.readonly .ck.ck-widget__selection-handle {
    display: none !important;
  }
  article.readonly .ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected {
    outline: none;
  }
</style>