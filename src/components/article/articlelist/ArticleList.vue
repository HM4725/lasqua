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
      PRELOAD: 1,
      pagination: ''
    }
  },
  computed: {
    isLeftExist() {
      return this.articles.itr > 0
    },
    isRightExist() {
      if(this.articles.loaded.length > 0 && this.articles.loaded.at(-1).no !== undefined) {
        return this.articles.itr + this.articles.MOUNTSIZE < this.articles.TOTALSIZE
      } else {
        return false
      }
    },
    requestSize() {
      return this.pagination === 'scroll' ? this.articles.MOUNTSIZE : 1
    }
  },
  methods: {
    // Child API
    handleRequest(way) {
      const reqWay = this.pagination === 'scroll' ? 'next' : way
      if(reqWay === 'prev') {
        this.isLeftExist && this.injectToChild(way)
      } else { // 'next'
        if(this.articles.itr + this.articles.MOUNTSIZE + this.requestSize + this.PRELOAD
            <= this.articles.loaded.length) {
          this.injectToChild(way)
        } else {
          this.isRightExist && this.$emit('request', {way: reqWay, page: ++this.page})
        }
      }
    },    
    injectToChild(way) {
      if(!this.init) {
        const size = this.pagination === 'button' ?
          this.articles.MOUNTSIZE + 1 : this.articles.MOUNTSIZE
        this.$refs.list.inject(this.articles.loaded.slice(0, size))
        this.init = true
      } else {
        if(way === 'prev') {
            const itr = this.articles.itr
            this.$refs.list.inject(this.articles.loaded.slice(itr - this.requestSize, itr), way)
            this.articles.itr -= this.requestSize
        } else { // way === 'next'
            const itr = this.articles.itr + this.articles.MOUNTSIZE
            this.$refs.list.inject(this.articles.loaded.slice(itr, itr + this.requestSize), way)
            this.articles.itr += this.requestSize
        }
      }
    },
    handleClick(no) {
      this.$emit('clicked', no)
    },
    // Parent API
    inject(data, way) {
      if(!this.init) {
        this.MAXPAGE = data.maxPage
        this.articles.TOTALSIZE = data.allArticleCount
        this.articles.BLOCKSIZE = data.articles.length
        const size = this.pagination === 'button' ?
          this.articles.MOUNTSIZE + 1 : this.articles.MOUNTSIZE
        this.articles.loaded.push(...data.articles)
        for(let i = this.articles.BLOCKSIZE; i < size; i++) {
            this.articles.loaded.push({})
        }
      } else {
        this.articles.loaded.push(...data.articles)
      }
      this.injectToChild(way)
    }
  },
  created() {
    this.pagination = this.$isMobile() ? 'scroll': this.paging;
    this.articles.MOUNTSIZE = this.$isMobile() ? 2 : this.rowlength;
  },
  beforeMount() {
    this.$emit('request', {page: this.page})
  }
}
</script>

<style scoped>

</style>