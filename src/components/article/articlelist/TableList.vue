<template>
  <table>
    <article-row v-for="(row, i) in rows" :articles="row" :key="`row_${i}`"
      @mount="addRow" @clicked="handleClick"/>
  </table>
</template>

<script>
import ArticleRow from './ArticleRow.vue'
export default{
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
      INTERVAL: 1
    }
  },
  methods: {
    // Child API
    addRow() {
      const delta = (window.scrollY + window.innerHeight) - document.documentElement.scrollHeight
      Math.abs(delta) < this.INTERVAL && this.$emit('request')
    },
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
  },
  mounted() {
    window.addEventListener('scroll', this.addRow)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.addRow)
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