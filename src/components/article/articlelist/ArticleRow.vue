<template>
  <tr>
    <td v-for="(article, i) in articles" :key="`cell_${i}`">
      <article-cell :article="article" @clicked="handleClick"/>
    </td>
  </tr>
</template>

<script>
import ArticleCell from './ArticleCell.vue'

export default{
  name: 'components.article.list.table.row',
  emits: [
    'mount',
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
    }
  },
  mounted() {
    this.articles.at(-1).no && this.$emit('mount')
  }
}
</script>

<style scoped>

</style>