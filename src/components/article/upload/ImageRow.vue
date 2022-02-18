<template>
  <tr>
    <td v-for="(article, i) in articles" :key="`cell_${i}`">
      <article-cell :article="article" @clicked="handleClick"/>
    </td>
  </tr>
</template>

<script>
import ArticleCell from '../articlelist/ArticleCell.vue'

export default{
  name: 'components.article.upload.table.row',
  emits: [
    'clicked'
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
  }
}
</script>

<style scoped>

</style>