<template>
  <section>
    <div class="arrow-button" @click="handleClickButton('prev')">
      <before-icon class="arrow-icon" :class="{disabled: !isLeftExist}"/>
    </div>
    <article>
      <ul :class="{slide: slide}" 
        :style="{width: `${slideStyle.ulWidth}%`, transform: `translateX(-${slideStyle.left}%)`}">
        <li v-for="(article, i) in articles" :key="`cell_${i}`" :style="{width: `${slideStyle.liWidth}%`}">
          <article-cell :article="article" @clicked="handleClickArticle"/>
        </li>
      </ul>
    </article>
    <div class="arrow-button" @click="handleClickButton('next')">
      <after-icon class="arrow-icon" :class="{disabled: !isRightExist}"/>
    </div>
  </section>
</template>

<script>
import ArticleCell from './ArticleCell.vue'
import BeforeIcon from '../../icons/BeforeIcon.vue'
import AfterIcon from '../../icons/AfterIcon.vue'

export default{
  name: 'components.article.list.slide',
  emits: [
    'request',
    'clicked'
  ],
  components: {
    ArticleCell,
    BeforeIcon,
    AfterIcon
  },
  props: {
    rowlength: Number
  },
  data() {
    return {
      init: false,
      articles: [],
      itr: 0,
      slide: true,
      slideStyle: {
        ulWidth: '',
        liWidth: '',
        left: ''
      }
    }
  },
  computed: {
    isLeftExist() {
      return this.itr > 0
    },
    isRightExist() {
      if(this.itr + this.rowlength < this.articles.length) {
        return true
      } else {
        return this.$parent.isRightExist
      }
    }
  },
  methods: {
    // UI Event
    handleClickButton(way) {
      if(way === 'prev') {
        this.isLeftExist && this._moveLeft()
      } else { // next
        if(this.isRightExist) {
          if(this.itr + this.rowlength === this.articles.length) {
            this.$emit('request')
          } else {
            this._moveRight()
          }
        }
      }
    },
    // Child API
    handleClickArticle(no) {
      this.$emit('clicked', no)
    },
    // Parent API
    inject(articles) {
      if(!this.init) {
        if(articles.length <= this.rowlength) {
          for(let i = 0; i < articles.length; i++) {
            this.articles[i] = articles[i]
          }
        } else {
          this.articles = articles
          this.slideStyle.ulWidth = 100 / this.rowlength * (this.articles.length)
          this.slideStyle.left = 0
        }
        this.init = true
      } else {
        this.slide = false
        this.articles.push(...articles)
        this.slideStyle.ulWidth = 100 / this.rowlength * (this.articles.length)
        this.slideStyle.left = 100 * this.itr / this.articles.length
        setTimeout(this._moveRight, 50) // just moveRight -> cause a patrol animation
      }
    },
    // Private
    _moveLeft() {
      this.slide = true
      this.slideStyle.left -= 100 / this.articles.length
      this.itr--
    },
    _moveRight() {
      this.slide = true
      this.slideStyle.left += 100 / this.articles.length
      this.itr++
    }
  },
  created() {
    this.slideStyle.ulWidth = 100
    this.slideStyle.liWidth = 100 / this.rowlength
    this.slideStyle.left = 0
    for(let i = 0; i < this.rowlength; i++) {
      this.articles.push({})
    }
  }
}
</script>

<style scoped>
  ul, li {
    all: unset;
  }
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
    overflow: hidden;
    padding-top: 2px;
    margin: 0 0.75rem;
  }
  ul {
    display: flex;
    flex-direction: row;
  }
  ul.slide {
    transition: transform .25s ease-in-out;
  }
  ul > li {
    margin: 0 0.75rem;
  }
</style>