<template>
  <div class="artist-page">
    <header class="banner">
      <img-component :src="artist.bannerImage" ratio="20/3"/>
    </header>
    <section>
      <div class="artist" v-if="artist.id" >
        <artist-profile :artist="artist"/>
        <profile-modify-button v-if="myPage" class="button" @modify="modify"
          :artist="artist" :focus="signup"/>
        <router-button v-if="myPage&&(!$isMobile())" class="button" link="/account" value="개인정보 수정"/>
      </div>
      <div class="projects">
        <div v-if="myPage" class="buttons">
          <router-button v-if="$isMobile()" class="button" link="/account" value="개인정보 수정"/>
          <router-button class="button" link="/article/upload" value="게시글 올리기"/>
        </div>
        <article-list class="articles" ref="articles" :rowlength="3" paging="scroll"
          @request="handleRequest" @clicked="handleClick"/>
      </div>
    </section>
  </div>
</template>

<script>
import ImgComponent from '@/components/utils/ImgComponent.vue'
import ArtistProfile from '@/components/artist/ArtistProfile.vue'
import RouterButton from '@/components/buttons/RouterButton.vue'
import ArticleList from '@/components/article/articlelist/ArticleList.vue'
import ProfileModifyButton from '@/components/buttons/ProfileModifyButton.vue'

export default {
  name: 'user.artist.page',
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
      myPage: false,
      signup: false
    }
  },
  methods: {
    async loadArtist(id) {
      try {
        const response = await this.$api("GET", `/user/${id}`)
        this.artist = response.data
      } catch(error) {
        this.$handleWrongAccess('/')
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
    async handleRequest(page) {
      try {
        const response = await this.$api("GET", `/articles/${this.id}?page=${page}`)
        const data = response.data
        if(data.page === page) {
          data.articles.sort((a, b) => b.no - a.no)
          this.$refs.articles.inject(data)
        }
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
    this.$route.query.signup && (this.signup = true)
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
    display: flex;
    flex-direction: row;
    min-height: 60%;
  }
  .artist {
    flex: 1;
    padding: 0 1.5rem;
    position: relative;
    top: -7vw;
    height: fit-content;
  }
  .artist > .button {
    width: 100%;
    margin-top: 1rem;
  }
  .projects {
    flex: 3;
    padding: 1rem;
    height: fit-content;
  }
  .projects > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem;
  }
  .tooltip > .tooltip-text {
    display: none;
  }
  .tooltip:focus > .tooltip-text  {
    display: block;
  }
  @media (max-width: 767px) {
    .artist-page > section {
      flex-direction: column;
    }
    .artist {
      width: 100%;
      position: static;
      top: 0;
      padding: 0;
    }
    .artist > .button {
      padding: 0 6px;
    }
    .projects {
      flex: 1;
      padding: 0;
    }
    .projects > .buttons {
      justify-content: space-between;
      column-gap: 6px;
      padding: 6px;
    }
    .projects > .buttons > .button {
      flex: 1;
    }
    .articles {
      margin-top: 12px;
    }
  }
</style>