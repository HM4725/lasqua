<template>
  <div class="articlelist">
    <table-list v-if="pagination==='scroll'" ref="list" :rowlength="articles.mountsize"
      @request="handleRequest" @clicked="handleClick"/>
    <slide-list v-else-if="pagination==='button'" ref="list" :rowlength="articles.mountsize"
      @request="handleRequest" @clicked="handleClick"/>
  </div>
</template>

<script>
import TableList from './TableList.vue'
import SlideList from './SlideList.vue'

export default{
  name: 'components.article.list.main',
  emits: [
    'request',
    'clicked'
  ],
  components: {
    TableList,
    SlideList
  },
  props: {
    rowlength: {
      type: Number,
      default: 4
    },
    paging: {
      type: String,
      default: 'scroll',
      validator: v => ['button', 'scroll'].indexOf(v) !== -1
    },
  },
  data() {
    return {
      page: 1,
      MAXPAGE: 0,
      articles: {
        totalsize: 0,
        mountsize: 0,
        blocksize: 0,
        loaded: [],
        itr: 0
      },
      pagination: ''
    }
  },
  computed: {
    isRightExist() {
      return this.articles.blocksize > this.articles.mountsize &&
        this.articles.loaded.length < this.articles.totalsize
    }
  },
  methods: {
    // Child API
    handleRequest() {
      if(this.pagination === 'button') {
        this.isRightExist && this.$emit('request', ++this.page)
      } else { // scroll
        if(this.articles.itr + this.articles.mountsize > this.articles.loaded.length) {
          if(this.isRightExist) {
            this.$emit('request', ++this.page)
          } else {
            this.injectToChild()
          }
        } else {
          this.injectToChild()
        }
      }
    },    
    injectToChild() {
      const requestSize = this.pagination === 'button' ? 
        this.articles.blocksize : this.articles.mountsize
      const articles = this.articles.loaded.slice(this.articles.itr, 
        this.articles.itr + requestSize)
      if(articles.length === 0) {
        console.log(`articles: ${articles}`)
        console.log(`this.articles.itr: ${this.articles.itr}`)
        console.log(`requestSize: ${requestSize}`)
        console.log(`this.articles.loaded: ${this.articles.loaded}`)
      }
      this.$refs.list.inject(articles)
      articles.length > 0 && (this.articles.itr += requestSize)
    },
    handleClick(no) {
      this.$emit('clicked', no)
    },
    // Parent API
    inject(data) {
      this.MAXPAGE = data.maxPage
      this.articles.totalsize = data.allArticleCount
      this.articles.blocksize = data.articles.length
      this.articles.loaded.push(...data.articles)
      this.injectToChild()
    }
  },
  created() {
    this.pagination = this.$isMobile() ? 'scroll': this.paging;
    this.articles.mountsize = this.$isMobile() ? 3 : this.rowlength;
    this.$emit('request', this.page)
  }
}
</script>

<style scoped>

</style>