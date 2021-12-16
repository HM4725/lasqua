<template>
  <section class="container">
    <div class="arrow-button" @click="unshiftArticles" v-if="paging==='button'">
      <before-icon class="arrow-icon" :class="{disabled: !isLeftExist}"/>
    </div>
    <ul class="articles" :style="layoutStyle" ref="articles">
      <li v-for="(article, i) in articles.mounted" :key="i">
        <thumb-nail :article="article" :use-link="useLink" @click="clickArticle(i)"/>
      </li>
      <slot></slot>
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
    },
    useLink: {
      type: Boolean,
      default: false
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
        itr: 0,
        PRELOAD: 1
      },
    }
  },
  computed: {
    layoutStyle() {
      return this.paging === 'scroll' ?
        { gridTemplateColumns: `repeat(${this.rowlength}, minmax(0px, 1fr))` } : ""
    },
    isRightExist() {
      const limit = this.articles.loaded.length < this.articles.MOUNTSIZE || this.MAXPAGE === 0 ? 
        this.articles.loaded.length : this.articles.TOTALSIZE
      return this.articles.itr + this.articles.MOUNTSIZE < limit
    },
    isLeftExist() {
      return this.articles.itr > 0
    },
    hitTheRight() {
      return this.articles.mounted.at(-1).no && 
        this.articles.mounted.at(-1).no === this.articles.loaded.at(-1).no
    }
  },
  methods: {
    // API
    init(data) {
      this.articles.TOTALSIZE = data.allArticleCount
      this.MAXPAGE = data.maxPage
      this.articles.BLOCKSIZE = data.articles.length
      this.push(data.articles)
      for(let i = 0; i < Math.min(this.articles.MOUNTSIZE, this.articles.BLOCKSIZE); i++) {
        Object.assign(this.articles.mounted[i], this.articles.loaded[i])
      }
    },
    push(articles) {
      if(articles instanceof Array) {
        this.articles.loaded.push(...articles)
      } else {
        this.articles.loaded.push(articles)
      }
    },
    unshift(articles) {
      if(articles instanceof Array) {
        this.articles.loaded.unshift(...articles)
      } else {
        this.articles.loaded.unshift(articles)
      }
    },
    mount(itr) {
      if(itr < 0) { itr = 0 }
      const mounted = this.articles.loaded.slice(itr, itr + this.articles.MOUNTSIZE)
      const vacants = []
      for(let i = mounted.length; i < this.articles.MOUNTSIZE; i++) {
        vacants.push({})
      }
      this.articles.mounted = mounted.concat(vacants)
      this.articles.itr = itr
    },
    pushAndMount(articles) {
      this.push(articles)
      this.mount(this.articles.loaded.length - this.articles.MOUNTSIZE)
    },
    remove(no) {
      const idx = this.articles.loaded.findIndex(article => article.no === no)
      idx !== -1 && this.articles.loaded.splice(idx, 1)
      this.mount(this.articles.itr)
    },
    // Button Event
    async shiftArticles() {
      if(this.isRightExist) {
        if((this.articles.itr + this.articles.MOUNTSIZE + this.articles.PRELOAD) % this.articles.BLOCKSIZE === 0) {
          await this.$emit('requestPush', ++this.page)
        }
        if(this.articles.itr + this.articles.MOUNTSIZE <= this.articles.loaded.length) {
          this.mount(++this.articles.itr)
        }
      }
    },
    unshiftArticles() {
      if(this.isLeftExist) {
        this.mount(this.articles.itr - 1)
      }
    },
    // Scroll Event
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
    },
    // Click Thumbnail Event
    clickArticle(i) {
      this.$emit("clickArticle", this.articles.mounted[i].no)
    }
  },
  beforeMount() {
    for(let i = 0; i < this.articles.MOUNTSIZE; i++) {
      this.articles.mounted.push({})
    }
    this.$emit('requestPush', ++this.page)
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