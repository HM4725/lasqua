<template>
  <section class="container">
    <div class="arrow-button">
      <before-icon class="arrow-icon"/>
    </div>
    <ul class="articles">
      <li v-for="(article, i) in articleList" :key="i">
        <article-card :article="article"/>
      </li>
    </ul>
    <div class="arrow-button">
      <after-icon class="arrow-icon"/>
    </div>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import BeforeIcon from '@/components/icons/BeforeIcon.vue'
import AfterIcon from '@/components/icons/AfterIcon.vue'

export default{
  components: {
    ArticleCard,
    BeforeIcon,
    AfterIcon
  },
  data() {
    return {
      page: 1,
      articleList: [{}, {}, {title: 'test', image:{"img_link": '300'}}, {}]
    }
  },
  methods: {
    async loadArticleList() {
      try {
        const response = await this.$api("GET", `/articlelist?page=${this.page}`)
        const receivedArticles = response.data.article
        for(let i in receivedArticles) {
          this.articleList[i] = receivedArticles[i]
          if(i === 3) {
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
  .articles {display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1.5rem;
  }
</style>