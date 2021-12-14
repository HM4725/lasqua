<template>
  <div class="artist-page">
    <header>
      Banner
    </header>
    <section>
      <div class="profile"></div>
      <div class="projects">
        <router-button link="upload" value="게시글 올리기"/>
        <article-list ref="articles" rowlength="3" paging="scroll" @request-push="loadArticles"/>
      </div>
    </section>
  </div>
</template>

<script>
import RouterButton from '@/components/buttons/RouterButton.vue'
import ArticleList from '@/components/article/ArticleList.vue'

export default {
  name: 'ArtistPage',
  components: {
    RouterButton,
    ArticleList
  },
  props: {
    mypage: Boolean
  },
  data() {
    return {
      id: '',
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
  },
  beforeMount() {
    if(this.mypage) {
      this.id = this.$store.getters.getUserId
    } else {
      this.id = this.$route.query.id
      this.id || this.$router.replace('/error')
    }
  }
};
</script>

<style scoped>
  .artist-page {
    width: 100%;
    height: 100%;
  }
  .artist-page > header{
    height: 15%;
  }
  .artist-page > section {
    min-height: 85%;
    height: 200rem;
  }
  .artist-page > section {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .projects {
    padding: 1rem;
  }
</style>