<template>
  <div class="index-wrapper">
    <section class="portfolios">
      <article-list/>
      <p class="f-title">PORTFOLIOS</p>
    </section>
    <section class="artists">
      <article-list/>
      <p class="f-title">ARTISTS</p>
    </section>
  </div>
</template>

<script>
import ArticleList from '@/components/article/ArticleList.vue'
export default{
  components: {
    ArticleList
  }
}
</script>

<style scoped>
  .index-wrapper {
    width: 100%;
  }
  .index-wrapper > section {
    width: 100%;
  }
  .index-wrapper > section:first-child {
    padding-bottom: 3rem;
  }
  section > p {
    margin-top: 10px;
  }
</style>