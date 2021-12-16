<template>
  <div class="artist-page">
    <header class="banner">
    </header>
    <section>
      <div class="artist">
        <artist-profile :artist="artist"/>
        <div class="mypage" v-if="mypage">
          <router-button link="/article/upload" value="게시글 올리기"/>
        </div>
      </div>
      <div class="projects">
        <article-list ref="articles" rowlength="3" paging="scroll" mode="project" @request-push="loadArticles"/>
      </div>
    </section>
  </div>
</template>

<script>
import ArtistProfile from '@/components/article/ArtistProfile.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'
import ArticleList from '@/components/article/ArticleList.vue'

export default {
  name: 'ArtistPage',
  components: {
    ArtistProfile,
    RouterButton,
    ArticleList
  },
  props: {
    mypage: Boolean
  },
  data() {
    return {
      id: '',
      init: false,
      artist: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  },
  methods: {
    async loadArtist(id) {
      try {
        const response = await this.$api("GET", `/user/${id}`)
        this.artist = response.data
      } catch(error) {
        this.artist = {}
      }
    },
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
    this.id = this.mypage ? this.$store.getters.userId : this.$route.params.id
    this.loadArtist(this.id)
  }
};
</script>

<style scoped>
  .artist-page {
    width: 100%;
    height: 100%;
  }
  .artist-page > header.banner{
    height: 20%;
    background-color: #eeeeee
  }
  .artist-page > section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    min-height: 80%;
  }
  .artist {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: -10%;
  }
  .artist > .mypage {
    margin-top: 2rem;
  }
  .projects {
    padding: 1rem;
  }
</style>