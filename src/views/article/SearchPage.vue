<template>
  <div class="search-page">
    <div class="projects">
      <p class="title f-title">Projects</p>
      <article-list rowlength="4" ref="articles" mode="project" @request-push="loadArticles"/>
    </div>
    <div class="artists">
    </div>
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
      keyword: '',
      init: false
    }
  },
  methods: {
    async loadArticles(page) {
      try {
        const response = await this.$api("GET", `/search/articles?key=${this.keyword}&page=${page}`)
        const data = response.data
        if(!this.init) {
          this.$refs.articles.init(data)
          this.init = true
        } else {
          this.$refs.articles.push(data.articles)
        }
      } catch(error) {
        console.error(error)
      }
    }
  },
  watch: {
    '$route.query': {
      handler(query) {
        this.keyword = query.keyword
        this.init = false
        this.loadArticles(1)
      }
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.keyword || this.$router.replace('/error')
  }
}
</script>

<style scoped>
  .search-page {
    width: 100%;
  }
  .title {
    margin-bottom: .5rem;
  }
</style>