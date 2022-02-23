<template>
  <tr>
    <td v-for="(article, i) in articles" :key="`cell_${i}`">
      <article-cell :article="article"
        @clicked="handleClick" @error="handleError"/>
    </td>
  </tr>
</template>

<script>
import ArticleCell from '../articlelist/ArticleCell.vue'

export default{
  name: 'components.article.upload.table.row',
  emits: [
    'clicked',
    'error'
  ],
  components: {
    ArticleCell
  },
  props: {
    articles: {
      type: Array,
      default() {
        return []
      }
    },
  },
  methods: {
    // Child API
    handleClick(no) {
      this.$emit('clicked', no)
    },
    handleError(no) {
      this.$emit('error', no)
    }
  }
}
</script>

<style scoped>

</style>