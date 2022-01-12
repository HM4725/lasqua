<template>
  <div class="artist-page">
    <header class="banner">
      <img-component :src="artist.bannerImage" ratio="20/3"/>
    </header>
    <section>
      <div class="artist" v-if="artist.id" >
        <artist-profile :artist="artist"/>
        <profile-modify-button v-if="myPage" class="button" @modify="modify"
          :artist="artist" :focus="!artist.profileImage"/>
        <router-button v-if="myPage" class="button" link="/myinfo" value="개인정보 수정"/>
      </div>
      <div class="projects">
        <div v-if="myPage" class="buttons">
          <router-button class="button" link="/article/upload" value="게시글 올리기"/>
        </div>
        <article-list ref="articles" :rowlength="3" paging="scroll"
          @request="handleRequest" @clicked="handleClick"/>
      </div>
    </section>
  </div>
</template>

<script>
import ImgComponent from '@/components/utils/ImgComponent.vue'
import ArtistProfile from '@/components/article/ArtistProfile.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'
import ArticleList from '@/components/article/articlelist/ArticleList.vue'
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
      artist: {},
      myPage: false
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
    async modify(payload) {
      if(Object.keys(payload).length > 0) {
        payload.id = this.id
        try {
          await this.$api("PUT", "/user", payload)
          payload.bannerImage !== undefined && (this.artist.bannerImage = payload.bannerImage)
          payload.profileImage !== undefined && (this.artist.profileImage = payload.profileImage)
          payload.facebook !== undefined && (this.artist.facebook = payload.facebook)
          payload.instagram !== undefined && (this.artist.instagram = payload.instagram)
          payload.twitter !== undefined && (this.artist.twitter = payload.twitter)
          payload.info !== undefined && (this.artist.info = payload.info)
        } catch(error) {
          console.error(error)
        }
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
    this.id === this.$store.getters.userId && (this.myPage = true)
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
  .artist > .button {
    width: 100%;
    margin-top: 1rem;
  }
  .projects {
    padding: 1rem;
    height: fit-content;
  }
  .projects > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 1rem;
  }
  .tooltip > .tooltip-text {
    display: none;
  }
  .tooltip:focus > .tooltip-text  {
    display: block;
  }
</style>