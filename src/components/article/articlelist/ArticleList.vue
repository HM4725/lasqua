<template>
  <div>
    <table-list v-if="pagination==='scroll'" ref="list" :rowlength="articles.MOUNTSIZE"
      @request="handleRequest" @clicked="handleClick"/>
    <slide-list v-else-if="pagination==='button'" ref="list" :rowlength="articles.MOUNTSIZE"
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
      init: false,
      page: 1,
      MAXPAGE: 0,
      articles: {
        TOTALSIZE: 0,
        MOUNTSIZE: 0,
        BLOCKSIZE: 0,
        loaded: [],
        itr: 0
      },
      pagination: ''
    }
  },
  computed: {
    isRightExist() {
      return this.articles.BLOCKSIZE > this.articles.MOUNTSIZE &&
        this.articles.loaded.length < this.articles.TOTALSIZE
    },
    requestSize() {
      return this.pagination === 'button' ? this.articles.BLOCKSIZE : this.articles.MOUNTSIZE
    }
  },
  methods: {
    // Child API
    handleRequest() {
      if(this.pagination === 'button') {
        this.isRightExist && this.$emit('request', ++this.page)
      } else { // scroll
        if(this.articles.itr + this.articles.MOUNTSIZE > this.articles.loaded.length) {
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
      const articles = this.articles.loaded.slice(this.articles.itr, 
        this.articles.itr + this.requestSize)
      this.$refs.list.inject(articles)
      articles.length > 0 && (this.articles.itr += this.requestSize)
    },
    handleClick(no) {
      this.$emit('clicked', no)
    },
    // Parent API
    inject(data) {
      if(!this.init) {
        this.MAXPAGE = data.maxPage
        this.articles.TOTALSIZE = data.allArticleCount
        this.articles.BLOCKSIZE = data.articles.length
        this.init = true
      }
      this.articles.loaded.push(...data.articles)
      this.injectToChild()
    }
  },
  created() {
    this.pagination = this.$isMobile() ? 'scroll': this.paging;
    this.articles.MOUNTSIZE = this.$isMobile() ? 3 : this.rowlength;
    this.$emit('request', this.page)
  }
}
</script>

<style scoped>

</style>