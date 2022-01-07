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
    this.$emit('mount')
  }
}
</script>

<style scoped>

</style>