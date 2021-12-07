<template>
  <section class="container">
    <div class="arrow-button">
      <before-icon class="arrow-icon"/>
    </div>
    <ul class="articles">
      <li v-for="(article, i) in articleList" :key="i">
        <thumb-nail :article="article"/>
      </li>
    </ul>
    <div class="arrow-button">
      <after-icon class="arrow-icon"/>
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
  data() {
    return {
      page: 1,
      articleList: [{}, {}, {}, {}]
    }
  },
  methods: {
    async loadArticleList() {
      try {
        const response = await this.$api("GET", `/articlelist?page=${this.page}`)
        const receivedArticles = response.data.article
        let i = 0
        for(i in receivedArticles) {
          this.articleList[i] = receivedArticles[i]
          if(i === '2') {
            console.log('break')
            break
          }
        }
      } catch(error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.loadArticleList()
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1.5rem;
  }
</style>