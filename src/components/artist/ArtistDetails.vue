<template>
  <section class="artist-details">
    <div class="artist">
      <div class="image">
        <img-component :src="artist.profileImage" :title="artist.id" ratio="3/4" class="artist-img"/>
      </div>
      <div class="information">
        <dl><dt>작가</dt><dd>{{artist.id}}</dd></dl>
        <dl><dt>소개</dt><dd>{{artist.info}}</dd></dl>
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
      <template v-if="$isMobile()">
        <label :class="{open: open}" @click="toggleOthers">
          작가의 다른 작품 더보기 <after-icon class="open-icon"/>
        </label>
        <div class="articles-wrapper">
          <transition name="slide-down">
            <article-list v-show="open" ref="articles" :rowlength="3" 
              paging="scroll" @request="handleRequest" @clicked="handleClick"/>
          </transition>
        </div>
      </template>
      <template v-else>
        <label>작가의 다른 작품 더보기</label>
        <article-list ref="articles" :rowlength="4" paging="button"
          @request="handleRequest" @clicked="handleClick"/>
      </template>
    </div>
  </section>
</template>

<script>
import ArticleList from '../article/articlelist/ArticleList.vue'
import ImgComponent from '../utils/ImgComponent.vue'
import SnsLinkButton from '../buttons/SnsLinkButton.vue'
import AfterIcon from '@/components/icons/AfterIcon.vue'

export default{
  name: 'components.article.artist.details',
  components: {
    ArticleList,
    ImgComponent,
    SnsLinkButton,
    AfterIcon
  },
  props: {
    uid: String,
    no: Number
  },
  data() {
    return {
      artist: {},
      open: false
    }
  },
  methods: {
    async loadArtist() {
      try {
        const response = await this.$api("GET", `/user/${this.uid}`)
        if(!response.data.profileImage) {
          response.data.profileImage = require('@/assets/img/default-profile.png')
        }
        this.artist = response.data
      } catch(error) {
        this.artist = {}
      }
    },
    async handleRequest(page) {
      try {
        const response = await this.$api("GET", `/articles/${this.uid}?page=${page}`)
        const data = response.data
        if(data.page === page) {
          const idx = data.articles.findIndex(article => article.no === this.no)
          data.articles.splice(idx, 1)
          data.articles.sort((a, b) => b.no - a.no)
          data.allArticleCount -= 1
          this.$refs.articles.inject(data)
        }
      } catch(error) {
        console.error(error)
      }
    },
    handleClick(no) {
      this.$router.push(`/article/view?no=${no}`)
    },
    toggleOthers() {
      this.open = !this.open
    }
  },
  computed: {
    useSns() {
      return this.artist.facebook || this.artist.instagram || this.artist.twitter
    }
  },
  created() {
    this.loadArtist()
  }
}
</script>

<style scoped>
  ul, li {
    all: unset;
  }
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
  @media (max-width: 767px) {
    .artist-details > .artist {
      flex-direction: row;
      padding: 6px 0;
      border: none;
    }
    .artist-details > .artist > .image{
      flex: 2;
      margin: auto 6px;
      padding: 0;
    }
    .artist-details > .artist > .information {
      padding: .5rem .5rem 0 1rem;
      flex: 3;
    }
    .projects > label {
      display: block;
      color: var(--base-color);
      padding: 1rem;
      margin-right: 0;
    }
    .open-icon {
      transition: transform .25s ease-out;
      position: relative;
      top: 2px;
    }
    label.open > .open-icon {
      transform: rotate(90deg);
    }
    div.articles-wrapper {
      overflow: hidden;
    }
  }
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  }
  .slide-down-enter-from,
  .slide-down-leave-active {
    opacity: 0;
    transform: translateY(-50%);
  }
</style>