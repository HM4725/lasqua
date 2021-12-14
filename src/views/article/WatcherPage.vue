<template>
  <div class="watcher-page">
    <article-list rowlength="4" ref="articles" use-link @request-push="loadArticles"/>
  </div>
</template>

<script>
import ArticleList from '@/components/article/ArticleList.vue'

export default{
  name: "WatcherPage",
  components: {
    ArticleList
  },
  data() {
    return {
      init: false
    }
  },
  methods: {
    async loadArticles(page) {
      try {
        const response = await this.$api("GET", `/articlelist?page=${page}`)
        const data = response.data
        if(page === data.page) {
          if(!this.init) {
            this.$refs.articles.init(data)
            this.init = true
          } else {
            this.$refs.articles.push(data.articles)
          }
        }
      } catch(error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
  .watcher-page {
    width: 100%;
  }
</style>