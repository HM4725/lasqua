<template>
  <div class="search-box">
    <form @submit.prevent="search">
        <input class="search-input" type="text" v-model="keyword" placeholder="Search..."/>
        <default-button class="search-button" type="submit" value="검색"/>
    </form>
  </div>
</template>

<script>
import DefaultButton from '../buttons/DefaultButton.vue'

export default{
  emits: [
    'search'
  ],
  components: {
    DefaultButton
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      this.$router.push({name: 'search', query: {keyword: this.keyword}})
      this.$emit('search')
    },
    clear() {
      this.keyword = ''
    }
  }
}
</script>

<style scoped>
  .search-box {
    width: 100%;
    margin-bottom: 3rem;
  }
  .search-input {
    width: -webkit-calc(100% - 3.5rem);
    width: -moz-calc(100% - 3.5rem);
    width: calc(100% - 3.5rem);
    margin-right: .5rem;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--base-color);
  }
  .search-input:focus {
    outline: none;
  }
  .search-button {
    width: 3rem;
    min-height: 2rem;
    padding: 0;
  }
</style>