<template>
  <div class="watcher-page">
    <article-list ref="articles" :rowlength="4" paging="button"
      @request="handleRequest" @clicked="handleClick"/>
  </div>
</template>

<script>
import ArticleList from '@/components/article/articlelist/ArticleList.vue'

export default{
  name: "article.watcher.page",
  components: {
    ArticleList
  },
  methods: {
    async handleRequest() {
      try {
        const response = await this.$api("GET", `/articlelist`)
        const data = response.data
        this.$refs.articles.inject(data)
      } catch(error) {
        console.error(error)
      }
    },
    handleClick(no) {
      this.$router.push(`/article/view?no=${no}`)
    }
  }
}
</script>

<style scoped>
  .watcher-page {
    width: 100%;
  }
</style>