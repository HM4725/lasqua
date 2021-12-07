<template>
  <div class="watcher-page">
    <article-list/>
  </div>
</template>

<script>
import ArticleList from '@/components/article/ArticleList.vue'

export default{
  name: "WatcherPage",
  components: {
    ArticleList
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped>
  .watcher-page {
    width: 100%;
  }
</style>