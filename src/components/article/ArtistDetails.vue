<template>
  <section class="artist-details">
    <div class="artist">
      <div class="image">
        <img-component :src="profileImage" :title="artist.id" ratio="3/4" class="artist-img"/>
      </div>
      <div class="information">
        <div class="id"><span>작가</span>{{artist.id}}</div>
        <div class="info"><span>소개</span>{{artist.info}}</div>
        <ul class="sns" v-if="useSns">
          <li v-if="artist.facebook">
            <sns-link-button type="facebook" :link="artist.facebook"/>
          </li>
          <li v-if="artist.facebook">
            <sns-link-button type="instagram" :link="artist.instagram"/>
          </li>
          <li v-if="artist.twitter">
            <sns-link-button type="twitter" :link="artist.twitter"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="projects">
      <label>작가의 다른 작품 더보기</label>
      <article-list ref="articles" :rowlength="4" paging="button"
        @request="handleRequest" @clicked="handleClick"/>
    </div>
  </section>
</template>

<script>
import ArticleList from './articlelist/ArticleList.vue'
import ImgComponent from '../utils/ImgComponent.vue'
import SnsLinkButton from '../buttons/SnsLinkButton.vue'

export default{
  components: {
    ArticleList,
    ImgComponent,
    SnsLinkButton
  },
  props: {
    uid: String
  },
  data() {
    return {
      artist: {}
    }
  },
  methods: {
    async loadArtist() {
      try {
        const response = await this.$api("GET", `/user/${this.uid}`)
        this.artist = response.data
      } catch(error) {
        this.artist = {}
      }
    },
    async handleRequest(payload) {
      try {
        const response = await this.$api("GET", `/articles/${this.uid}?page=${payload.page}`)
        const data = response.data
        if(data.page === payload.page) {
          data.articles.sort((a, b) => b.no - a.no)
          this.$refs.articles.inject(data, payload.way)
        }
      } catch(error) {
        console.error(error)
      }
    },
    handleClick(no) {
      this.$router.push(`/article/view?no=${no}`)
    }
  },
  computed: {
    useSns() {
      return this.artist.facebook || this.artist.instagram || this.artist.twitter
    },
    profileImage() {
      return this.artist.profileImage || require('@/assets/img/default-profile.png')
    }
  },
  created() {
    this.loadArtist()
  }
}
</script>

<style scoped>
  .artist-details {
    width: 100%;
  }
  .artist-details > .artist {
    display: flex;
    width: 100%;
    padding: 0 3rem;
  }
  .artist-details > .artist > .image {
    width: 20%;
    border: 1px solid var(--active-color);
  }
  .artist-details > .artist > .information {
    width: 80%;
    text-align: left;
    padding-left: 3rem;
  }
  .artist-details > .artist > .information > * {
    margin-bottom: .5rem;
  }
  .artist-details > .projects {
    text-align: right;
    width: 100%;
  }
  .projects > label {
    margin-right: 3rem;
    color: red;
  }
  span {
    color: var(--active-color);
    padding-right: 2rem;
  }
  ul.sns {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  ul.sns > li {
    margin-left: 8px;
  }
</style>