<template>
  <section class="container">
    <div class="arrow-button" @click="unshiftArticles" v-if="paging==='button'">
      <before-icon class="arrow-icon" :class="{disabled: !isLeftExist}"/>
    </div>
    <ul class="articles" :style="layoutStyle" ref="articles">
      <li v-for="(article, i) in articles.mounted" :key="i">
        <thumb-nail :article="article" use-link/>
      </li>
    </ul>
    <div class="arrow-button" @click="shiftArticles" v-if="paging==='button'">
      <after-icon class="arrow-icon" :class="{disabled: !isRightExist}"/>
    </div>
  </section>
</template>

<script>
import ThumbNail from './ThumbNail.vue'
import BeforeIcon from '@/components/icons/BeforeIcon.vue'
import AfterIcon from '@/components/icons/AfterIcon.vue'

export default{
  components: {
    ThumbNail,
    BeforeIcon,
    AfterIcon
  },
  props: {
    rowlength: {
      type: String,
      default: '4'
    },
    paging: {
      type: String,
      default: 'button',
      validator: function(value) {
        return ['button', 'scroll'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      page: 0,
      MAXPAGE: 0,
      articles: {
        TOTALSIZE: 0,
        BLOCKSIZE: 0,
        MOUNTSIZE: parseInt(this.rowlength),
        mounted: [],
        loaded: [],
        itr: 0
      },
    }
  },
  computed: {
    layoutStyle() {
      return this.paging === 'scroll' ?
        { gridTemplateColumns: `repeat(${this.rowlength}, minmax(0px, 1fr))` } : ""
    },
    isRightExist() {
      return this.articles.itr + this.articles.MOUNTSIZE < this.articles.TOTALSIZE
    },
    isLeftExist() {
      return this.articles.itr > 0
    },
    articleHeight() {
      return this.$refs.articles.querySelector('li').offsetHeight
    },
    aritclesVBottom() {
      return this.$refs.articles.lastElementChild.getBoundingClientRect().top
    } 
  },
  methods: {
    // API
    init(data) {
      this.articles.TOTALSIZE = data.allArticleCount
      this.articles.MAXPAGE = data.maxPage
      this.articles.BLOCKSIZE = data.articles.length
      this.push(data.articles)
      for(let i = 0; i < Math.min(this.articles.MOUNTSIZE, this.articles.BLOCKSIZE); i++) {
        Object.assign(this.articles.mounted[i], this.articles.loaded[i])
      }
    },
    push(articles) {
      this.articles.loaded.push(...articles)
    },
    unshift(articles) {
      this.articles.loaded.unshift(...articles)
    },
    // Move
    // Button Methods
    async shiftArticles() {
      if(this.isRightExist) {
        if((this.articles.itr + this.articles.MOUNTSIZE) % this.articles.BLOCKSIZE === 0) {
          await this.$emit('requestPush', ++this.page)
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
    // Scroll Methods
    async mountArticlesRow() {
      if(this.isRightExist) {
        if((this.articles.itr + this.articles.MOUNTSIZE) % this.articles.BLOCKSIZE === 0) {
          await this.$emit('requestPush', ++this.page)
        }
        const articles = []
        const unmountSize = this.articles.TOTALSIZE - (this.articles.itr + this.articles.MOUNTSIZE)
        const vacantSize = Math.max(this.articles.MOUNTSIZE - unmountSize, 0)
        for(let i = 0; i < this.articles.MOUNTSIZE - vacantSize; i++) {
          articles.push(this.articles.loaded[this.articles.itr + this.articles.MOUNTSIZE + i])
        }
        for(let i = 0; i < vacantSize; i++) {
          articles.push({})
        }
        this.articles.mounted.push(...articles)
        this.articles.itr = this.articles.itr + this.articles.MOUNTSIZE
      }
    }
  },
  beforeMount() {
    for(let i = 0; i < this.articles.MOUNTSIZE; i++) {
      this.articles.mounted.push({})
    }
    this.$emit('requestPush', 1)
    for(let i = 0; i < Math.min(this.articles.MOUNTSIZE, this.articles.BLOCKSIZE); i++) {
      Object.assign(this.articles.mounted[i], this.articles.loaded[i])
    }
    this.paging === 'scroll' && window.addEventListener('scroll', this.mountArticlesRow)
  },
  beforeUnmount() {
    this.paging === 'scroll' && window.removeEventListener('scroll', this.mountArticlesRow)
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