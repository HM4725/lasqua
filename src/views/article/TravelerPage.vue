<template>
  <div class="index-wrapper">
    <section class="artists">
      <article-list rowlength="4" ref="artists" mode="artist" @request-push="loadArtists"/>
    </section>
  </div>
</template>

<script>
import ArticleList from '@/components/article/ArticleList.vue'

function getArticlelistFrom(userlist) {
  const users = []
  for(let i in userlist.users) {
    let user = userlist.users[i]
    users.push({
      no: 0,
      id: user.id,
      title: user.id,
      images: {
        orderNo: 0,
        name: user.id,
        link: user.image || require('@/assets/img/default-profile.png')
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
        const response = await this.$api("GET", `/userlist?page=${page}`)
        const data = getArticlelistFrom(response.data)
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