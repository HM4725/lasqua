<template>
  <section class="index-wrapper">
    <header class="index-phrase">
      <span class="index-phrase-font">{{indexPhrase}}</span>
    </header>
    <article class="cate-select">
      <index-button category="watcher"/>
      <x-icon class="x-icon" :size="xIconSize"/>
      <index-button category="traveler"/>
    </article>
  </section>
</template>

<script>
import IndexButton from '@/components/buttons/IndexButton.vue'
import XIcon from '@/components/icons/XIcon.vue'

export default {
  name: 'index.page',
  components: {
    IndexButton,
    XIcon
  },
  data() {
    return {
      xIconSize: 192,
      indexPhrase: "Which kind of project wanna hang out?",
    }
  }
}
</script>

<style scoped>
  .index-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  .index-phrase {
    margin-bottom: 80px;
  }
  .index-phrase-font {
    font-size: 2.5rem;
  }
  .cate-select {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 767px) {
    .index-wrapper {
      padding-bottom: 48px;
    }
    .index-phrase {
      width: 320px;
    }
    .index-phrase-font {
      font-size: -webkit-calc(1.375rem + 1.5vw);
      font-size: -moz-calc(1.375rem + 1.5vw);
      font-size: calc(1.375rem + 1.5vw);
    }
    .x-icon {
      display: none;
    }
  }
</style>