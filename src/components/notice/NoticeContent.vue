<template>
  <div class="ProseMirror readonly" v-html="content"></div>
</template>

<script>
export default{
  name: 'components.notice.content',
  components: {
  },
  props: {
    content: String
  },
  data() {
    return {
    }
  }
}
</script>

<style>
  @import "../../assets/css/tiptap.css";
  
  .ProseMirror.readonly {
    border: 1px solid var(--base-color);
  }
</style>