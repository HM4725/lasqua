<template>
  <div class="search-page">
    <div class="projects">
      <p class="title f-title">Projects</p>
      <p v-if="notfound.projects">검색 결과가 없습니다.</p>
      <article-list ref="projects" :rowlength="4" paging="button"
        @request="handleRequestProject" @clicked="handleClickProject"/>
    </div>
    <div class="artists">
      <p class="title f-title">Artist</p>
      <p v-if="notfound.artists">검색 결과가 없습니다.</p>
      <article-list ref="artists" :rowlength="4" paging="button"
        @request="handleRequestArtist" @clicked="handleClickArtist"/>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/article/articlelist/ArticleList.vue'

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
      notfound: {
        projects: false,
        artists: false
      }
    }
  },
  methods: {
    async handleRequestProject(payload) {
      try {
        const response = await this.$api("GET", 
          `/search/articles?key=${this.keyword}&page=${payload.page}`)
        const data = response.data
        this.$refs.projects.inject(data, payload.way)
      } catch(error) {
        this.$refs.projects.inject({articles: []})
        error.response.status === 404 && (this.notfound.projects = true)
      }
    },
    handleClickProject(no) {
      this.$router.push(`/article/view?no=${no}`)
    },
    async handleRequestArtist(payload) {
      try {
        const response = await this.$api("GET", 
          `/search/users?key=${this.keyword}&page=${payload.page}`)
        const data = getArticlelistFrom(response.data)
        this.$refs.artists.inject(data, payload.way)
      } catch(error) {
        this.$refs.artists.inject({articles: []})
        error.response.status === 404 && (this.notfound.artists = true)
      }
    },
    handleClickArtist(id) {
      this.$router.push(`/artist/${id}`)
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
  div.projects {
    margin-bottom: 2rem;
  }
</style>