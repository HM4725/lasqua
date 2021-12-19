<template>
  <div class="search-page">
    <div class="projects">
      <p class="title f-title">Projects</p>
      <p v-if="notfound.articles">검색 결과가 없습니다.</p>
      <article-list rowlength="4" ref="articles" mode="project" @request-push="loadArticles"/>
    </div>
    <div class="artists">
      <p class="title f-title">Artist</p>
      <p v-if="notfound.artists">검색 결과가 없습니다.</p>
      <article-list rowlength="4" ref="artists" mode="artist" @request-push="loadArtists"/>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/article/ArticleList.vue'

function getArticlelistFrom(userlist) {
  const users = []
  for(let i in userlist.userList) {
    let user = userlist.userList[i]
    users.push({
      no: 0,
      id: user.id,
      title: user.id,
      images: {
        orderNo: 0,
        name: user.id,
        link: user.profileImage || require('@/assets/img/default-profile.png')
      }
    })
  }
  return {
    allArticleCount: userlist.allUserCount,
    page: userlist.page,
    maxPage: userlist.maxPage,
    articles: users
  }
}

export default{
  name: "WatcherPage",
  components: {
    ArticleList
  },
  data() {
    return {
      keyword: '',
      init: {
        articles: false,
        artists: false
      },
      notfound: {
        articles: false,
        artists: false
      }
    }
  },
  methods: {
    async loadArticles(page) {
      try {
        const response = await this.$api("GET", `/search/articles?key=${this.keyword}&page=${page}`)
        this.notfound.articles = false
        const data = response.data
        if(!this.init.articles) {
          this.$refs.articles.init(data)
          this.init.articles = true
        } else {
          this.$refs.articles.push(data.articles)
        }
      } catch(error) {
        error.response.status === 404 && (this.notfound.articles = true)
      }
    },
    async loadArtists(page) {
      try {
        const response = await this.$api("GET", `/search/users?key=${this.keyword}&page=${page}`)
        this.notfound.artists = false
        const data = getArticlelistFrom(response.data)
        if(!this.init.artists) {
          this.$refs.artists.init(data)
          this.init.artists = true
        } else {
          this.$refs.artists.push(data.articles)
        }
      } catch(error) {
        error.response.status === 404 && (this.notfound.artists = true)
      }
    }
  },
  watch: {
    '$route.query': {
      handler(query) {
        this.keyword = query.keyword
        if(this.keyword) {
          this.init.articles = false
          this.loadArticles(1)
          this.init.artists = false
          this.loadArtists(1)
        }
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