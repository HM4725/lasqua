<template>
  <div class="choice-wrapper">
    <div class="choice-phrase">
      <span class="choice-phrase-font">{{choicePhrase}}</span>
    </div>
    <div class="choice-select">
      <choice-option-component option="watcher"/>
      <choice-between-options-component/>
      <choice-option-component option="traveler"/>
    </div>
  </div>
</template>

<script>
import ChoiceOptionComponent from '../components/ChoiceOptionComponent.vue'
import ChoiceBetweenOptionsComponent from '../components/ChoiceBetweenOptionsComponent.vue'
export default {
  components: {
    ChoiceOptionComponent,
    ChoiceBetweenOptionsComponent
  },
  data() {
    return {
      choicePhrase: "Which kind of project wanna hang out?",
    }
  }
}
</script>

<style scoped>
.choice-wrapper {
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
.choice-phrase {
  margin-bottom: 5rem;
}
.choice-phrase-font {
  font-size: 2.5rem;
}
.choice-select {
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media (max-width: 767px) {
  .choice-wrapper {
    padding-bottom: 3rem;
  }
  .choice-phrase {
    width: 20rem;
  }
  .choice-phrase-font {
    font-size: -webkit-calc(1.375rem + 1.5vw);
    font-size: -moz-calc(1.375rem + 1.5vw);
    font-size: calc(1.375rem + 1.5vw);
  }
}
</style>