<template>
  <div class="index-wrapper">
    <section class="portfolios">
      <article-list rowlength="4" ref="portfolios" @request-push="loadPortfolios"/>
      <p class="f-title">PORTFOLIOs</p>
    </section>
    <section class="artists">
      <article-list rowlength="4" ref="artists" @request-push="loadArtists"/>
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
      init: {
        portfolios: false,
        artists: false
      }
    }
  },
  methods: {
    async loadPortfolios(page) {
      try {
        const response = await this.$api("GET", `/articlelist?page=${page}`)
        const data = response.data
        if(page === data.page) {
          if(!this.init.portfolios) {
            this.$refs.portfolios.init(data)
            this.init.portfolios = true
          } else {
            this.$refs.portfolios.push(data.articles)
          }
        }
      } catch(error) {
        console.error(error)
      }
    },
    async loadArtists(page) {
      try {
        const response = await this.$api("GET", `/articlelist?page=${page}`)
        const data = response.data
        if(page === data.page) {
          if(!this.init.artists) {
            this.$refs.artists.init(data)
            this.init.artists = true
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