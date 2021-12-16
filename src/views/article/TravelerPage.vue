<template>
  <div class="index-wrapper">
    <section class="artists">
      <article-list rowlength="4" ref="artists" mode="artist" @request-push="loadArtists"/>
      <p class="f-title">ARTISTs</p>
    </section>
  </div>
</template>

<script>
import ArticleList from '@/components/article/ArticleList.vue'
export default{
  components: {
    ArticleList
  },
  data() {
    return {
      init: false
    }
  },
  methods: {
    async loadArtists(page) {
      try {
        const response = await this.$api("GET", `/articlelist?page=${page}`)
        const data = response.data
        if(page === data.page) {
          if(!this.init) {
            this.$refs.artists.init(data)
            this.init = true
          } else {
            this.$refs.artists.push(data.articles)
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
  .index-wrapper {
    width: 100%;
  }
  .index-wrapper > section {
    width: 100%;
  }
  .index-wrapper > section:first-child {
    padding-bottom: 3rem;
  }
  section > p {
    margin-top: 10px;
  }
</style>