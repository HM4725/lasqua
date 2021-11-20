<template>
  <div class="index-wrapper">
    <div class="index-phrase">
      <span class="index-phrase-font">{{indexPhrase}}</span>
    </div>
    <div class="cate-select">
      <cate-button-component category="watcher"/>
      <cate-mid-buttons-component/>
      <cate-button-component category="traveler"/>
    </div>
  </div>
</template>

<script>
import CateButtonComponent from '../components/CateButtonComponent.vue'
import CateMidButtonsComponent from '../components/CateMidButtonsComponent.vue'
export default {
  components: {
    CateButtonComponent,
    CateMidButtonsComponent
  },
  data() {
    return {
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
  margin-bottom: 5rem;
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
    padding-bottom: 3rem;
  }
  .index-phrase {
    width: 20rem;
  }
  .index-phrase-font {
    font-size: -webkit-calc(1.375rem + 1.5vw);
    font-size: -moz-calc(1.375rem + 1.5vw);
    font-size: calc(1.375rem + 1.5vw);
  }
}
</style>