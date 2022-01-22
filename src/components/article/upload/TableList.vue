<template>
  <table>
    <article-row v-for="(row, i) in rows" :articles="row" :key="`row_${i}`"
      @mount="addRow" @clicked="handleClick"/>
  </table>
</template>

<script>
import ArticleRow from '../articlelist/ArticleRow.vue'

export default{
  name: 'components.article.upload.table',
  emits: [
    'request',
    'clicked'
  ],
  components: {
    ArticleRow
  },
  props: {
    rowlength: Number
  },
  data() {
    return {
      rows: [],
      INTERVAL: 5
    }
  },
  methods: {
    handleClick(no) {
      this.$emit('clicked', no)
    },
    // Parent API
    inject(articles) {
      for(let i = articles.length; i < this.rowlength; i++) {
        articles.push({})
      }
      this.rows.push(articles)
    }
  }
}
</script>

<style scoped>
  table{
    width:100%;
    table-layout: fixed;
    overflow-wrap: break-word;
    border-spacing: 1.5rem;
  }
</style>