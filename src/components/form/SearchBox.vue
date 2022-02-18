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
  name: 'components.form.search',
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
      if(this.keyword) {
        this.$router.push({name: 'search', query: {keyword: this.keyword}})
        this.$emit('search')
      }
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
    margin-bottom: 48px;
  }
  .search-input {
    width: -webkit-calc(100% - 56px);
    width: -moz-calc(100% - 56px);
    width: calc(100% - 56px);
    margin-right: 8px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--base-color);
  }
  .search-input:focus {
    outline: none;
  }
  .search-button {
    width: 48px;
    min-height: 32px;
    padding: 0;
  }
</style>