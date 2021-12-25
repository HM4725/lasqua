<template>
  <div class="artist-page">
    <header class="banner">
      <img-component :src="artist.bannerImage" ratio="20/3"/>
    </header>
    <section>
      <div class="artist">
        <artist-profile :artist="artist"/>
        <div class="buttons">
          <router-button class="button" link="/article/upload" value="게시글 올리기"/>
          <profile-modify-button class="button" @modify="modify" :artist="artist"/>
        </div>
      </div>
      <div class="projects">
        <article-list ref="articles" rowlength="3" paging="scroll" mode="project" @request-push="loadArticles"/>
      </div>
    </section>
  </div>
</template>

<script>
import ImgComponent from '@/components/utils/ImgComponent.vue'
import ArtistProfile from '@/components/article/ArtistProfile.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'
import ArticleList from '@/components/article/ArticleList.vue'
import ProfileModifyButton from '@/components/buttons/ProfileModifyButton.vue'

export default {
  name: 'ArtistPage',
  components: {
    ImgComponent,
    ArtistProfile,
    RouterButton,
    ArticleList,
    ProfileModifyButton
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
    async loadArticles(page) {
      try {
        const response = await this.$api("GET", `/articles/${this.id}?page=${page}`)
        const data = response.data
        if(page === data.page) {
          data.articles.sort((a, b) => b.no - a.no)
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
    },
    async modify(payload) {
      if(Object.keys(payload).length > 0) {
        payload.id = this.id
        try {
          await this.$api("PUT", "/user", payload)
          payload.bannerImage && (this.artist.bannerImage = payload.bannerImage)
          payload.profileImage && (this.artist.profileImage = payload.profileImage)
          payload.facebook && (this.artist.facebook = payload.facebook)
          payload.instagram && (this.artist.instagram = payload.instagram)
          payload.twitter && (this.artist.twitter = payload.twitter)
          payload.info && (this.artist.info = payload.info)
        } catch(error) {
          console.error(error)
        }
      }
    }
  },
  beforeMount() {
    this.id = this.$store.getters.userId
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
    background-color: #eeeeee;
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
  .artist > .buttons {
    width: 60%;
    margin: .5rem auto 0 auto;
  }
  .artist > .buttons > .button {
    margin-top: 1rem;
    width: 100%;
  }
  .projects {
    padding: 1rem;
  }
</style>