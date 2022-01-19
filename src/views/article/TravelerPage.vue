<template>
  <div class="traveler-page">
    <article-list ref="artists" :rowlength="4" paging="button"
      @request="handleRequest" @clicked="handleClick"/>
  </div>
</template>

<script>
import ArticleList from '@/components/article/articlelist/ArticleList.vue'

function getArticlelistFrom(userlist) {
  const users = []
  for(let i in userlist.users) {
    let user = userlist.users[i]
    users.push({
      no: user.id,
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
  name: 'article.traveler.page',
  components: {
    ArticleList
  },
  methods: {
    async handleRequest() {
      try {
        const response = await this.$api("GET", '/userlist')
        const data = getArticlelistFrom(response.data)
        this.$refs.artists.inject(data)
      } catch(error) {
        console.error(error)
      }
    },
    handleClick(id) {
      this.$router.push(`/artist/${id}`)
    }
  }
}
</script>

<style scoped>
  .traveler-page {
    width: 100%;
  }
</style>