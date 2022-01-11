<template>
  <div class="watcher-page">
    <article-list ref="articles" :rowlength="4" paging="button"
      @request="handleRequest" @clicked="handleClick"/>
  </div>
</template>

<script>
import ArticleList from '@/components/article/articlelist/ArticleList.vue'

export default{
  name: "WatcherPage",
  components: {
    ArticleList
  },
  methods: {
    async handleRequest(payload) {
      try {
        const response = await this.$api("GET", `/articlelist`)
        const data = response.data
        this.$refs.articles.inject(data, payload.way)
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