<template>
  <section>
    <div class="arrow-button" @click="handleClickButton('prev')">
      <before-icon class="arrow-icon" :class="{disabled: !$parent.isLeftExist}"/>
    </div>
    <article>
      <table ref="table" :style="tableStyle">
        <article-row :articles="articles" @clicked="handleClickArticle"/>
      </table>
    </article>
    <div class="arrow-button" @click="handleClickButton('next')">
      <after-icon class="arrow-icon" :class="{disabled: !$parent.isRightExist}"/>
    </div>
  </section>
</template>

<script>
import ArticleRow from './ArticleRow.vue'
import BeforeIcon from '../../icons/BeforeIcon.vue'
import AfterIcon from '../../icons/AfterIcon.vue'

export default{
  emits: [
    'request',
    'clicked'
  ],
  components: {
    ArticleRow,
    BeforeIcon,
    AfterIcon
  },
  props: {
    rowlength: Number
  },
  data() {
    return {
      articles: [{}],
      tableStyle: {
        left: '',
        width: '',
        transition: '',
        transform: ''
      }
    }
  },
  computed: {
    moveRatio() {
      return this.tableLeft / this.tableWidth * 100
    },
    tableLeft() {
      return 100 / this.rowlength * (this.rowlength + 1) - 100
    },
    tableWidth() {
      return 100 / this.rowlength * (this.rowlength + 2)
    }
  },
  methods: {
    // UI Event
    handleClickButton(way) {
      this.$emit('request', way)
    },
    // Child API
    handleClickArticle(no) {
      this.$emit('clicked', no)
    },
    // Parent API
    inject(articles, way) {
      if(articles.length > 1) {
        this._init(articles)
      } else {
        this._appendArticle(articles[0], way)
      }
    },
    // Private
    _init(articles) {
      for(let i = articles.length; i < this.rowlength; i++) {
        articles.push({})
      }
      this.articles.push(...articles)
    },
    _appendArticle(article, way) {
      if(way === 'prev') {
        this.tableStyle.transition = 'transform .25s ease-in-out'
        this.tableStyle.transform = `translateX(${this.moveRatio}%)`
        setTimeout(() => {
          const tmp = []
          Object.assign(tmp, this.articles)
          tmp.unshift(article)
          tmp.pop()
          this.tableStyle.transition = ''
          this.tableStyle.transform = ''
          this.articles = tmp
        }, 250)
      } else {
        this.tableStyle.transition = 'transform .25s ease-in-out'
        this.tableStyle.transform = `translateX(-${this.moveRatio}%)`
        setTimeout(() => {
          const tmp = []
          Object.assign(tmp, this.articles)
          tmp.push(article)
          tmp.shift()
          this.tableStyle.transition = ''
          this.tableStyle.transform = ''
          this.articles = tmp
        }, 250)
      }
    }
  },
  created() {
    this.tableStyle.left = `-${this.tableLeft}%`
    this.tableStyle.width = `${this.tableWidth}%`
  }
}
</script>

<style scoped>
  section {
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
  article {
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  table{
    position: relative;
    table-layout: fixed;
    overflow-wrap: break-word;
    border-spacing: 1.5rem;
  }
</style>