<template>
  <section class="container">
    <div class="arrow-button" @click="unshiftArticles">
      <before-icon class="arrow-icon" :class="{disabled: !isLeftExist}"/>
    </div>
    <ul class="articles">
      <li v-for="(article, i) in articles.mounted" :key="i">
        <thumb-nail :article="article" use-link/>
      </li>
    </ul>
    <div class="arrow-button" @click="shiftArticles">
      <after-icon class="arrow-icon" :class="{disabled: !isRightExist}"/>
    </div>
  </section>
</template>

<script>
import ThumbNail from './ThumbNail.vue'
import BeforeIcon from '@/components/icons/BeforeIcon.vue'
import AfterIcon from '@/components/icons/AfterIcon.vue'

const MOUNTSIZE = 4

export default{
  components: {
    ThumbNail,
    BeforeIcon,
    AfterIcon
  },
  data() {
    return {
      page: 1,
      MAXPAGE: 0,
      articles: {
        TOTALSIZE: 0,
        BLOCKSIZE: 0,
        MOUNTSIZE: MOUNTSIZE,
        mounted: [],
        loaded: [],
        itr: 0
      }
    }
  },
  computed: {
    isRightExist() {
      return this.articles.itr + this.articles.MOUNTSIZE < this.articles.TOTALSIZE
    },
    isLeftExist() {
      return this.articles.itr > 0
    }
  },
  methods: {
    async loadArticles(page) {
      try {
        const response = await this.$api("GET", `/articlelist?page=${page}`)
        const articles = response.data.article || response.data.articles // check!
        if(this.MAXPAGE === 0) {
          this._initArticles(response.data)
        }
        for(let i in articles) {
          this.articles.loaded.push(articles[i])
        }
      } catch(error) {
        console.error(error)
      }
    },
    _initArticles(data) {
      this.articles.TOTALSIZE = data.allArticleCount
      this.articles.BLOCKSIZE = data.article.length
      this.MAXPAGE = data.maxPage
      for(let i = 0; i < Math.min(this.articles.BLOCKSIZE, this.articles.MOUNTSIZE); i++) {
        this.articles.mounted.push(data.article[i])
      }
      for(let i = this.articles.BLOCKSIZE; i < this.articles.MOUNTSIZE; i++) {
        this.articles.mounted.push({})
      }
    },
    async shiftArticles() {
      if(this.isRightExist) {
        if((this.articles.itr + this.articles.MOUNTSIZE) % this.articles.BLOCKSIZE === 0) {
          await this.loadArticles(++this.page)
        }
        const articles = []
        const right = this.articles.loaded[this.articles.itr + this.articles.MOUNTSIZE]
        Object.assign(articles, this.articles.mounted)
        articles.shift()
        articles.push(right)
        this.articles.mounted = articles
        this.articles.itr++
      }
    },
    unshiftArticles() {
      if(this.isLeftExist) {
        const articles = []
        const left = this.articles.loaded[this.articles.itr - 1]
        Object.assign(articles, this.articles.mounted)
        articles.unshift(left)
        articles.pop()
        this.articles.mounted = articles
        this.articles.itr--
      }
    },
  },
  beforeMount() {
    this.loadArticles(1)
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .arrow-button {
    display: flex;
    padding: 0 1rem;
    cursor: pointer;
    align-items: center;
  }
  .arrow-button:hover > .arrow-icon {
    fill: var(--active-color);
  }
  .arrow-button:active {
    background-color: var(--active-bg-color);
  }
  .arrow-button:active > .arrow-icon {
    fill: var(--active-color);
  }
  .articles {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
    grid-gap: 1.5rem;
    margin: 0 1.5rem;
  }
</style>