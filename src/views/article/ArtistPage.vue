<template>
  <div class="artist-page">
    <header class="banner">
      <img-component :src="artist.bannerImage" ratio="20/3"/>
    </header>
    <section>
      <div class="artist" v-if="artist.id">
        <artist-profile :artist="artist"/>
      </div>
      <div class="projects">
        <article-list ref="articles" :rowlength="3" paging="scroll"
          @request="handleRequest" @clicked="handleClick"/>
      </div>
    </section>
  </div>
</template>

<script>
import ImgComponent from '@/components/utils/ImgComponent.vue'
import ArtistProfile from '@/components/article/ArtistProfile.vue'
import ArticleList from '@/components/article/articlelist/ArticleList.vue'

export default {
  name: 'ArtistPage',
  components: {
    ImgComponent,
    ArtistProfile,
    ArticleList
  },
  data() {
    return {
      id: '',
      init: false,
      artist: {},
      banner: ''
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
    async handleRequest(payload) {
      try {
        const response = await this.$api("GET", `/articles/${this.id}?page=${payload.page}`)
        const data = response.data
        data.articles.sort((a, b) => b.no - a.no)
        this.$refs.articles.inject(data, payload.way)
      } catch(error) {
        console.error(error)
      }
    },
    handleClick(no) {
      this.$router.push(`/article/view?no=${no}`)
    }
  },
  created() {
    this.id = this.$route.params.id
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
    overflow: hidden;
  }
  .artist-page > section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    min-height: 60%;
  }
  .artist {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: -7vw;
    height: fit-content;
  }
  .projects {
    padding: 1rem;
    height: fit-content;
  }
</style>