<template>
  <div id="choice-project">
    <div class="choice-phrase">
      <span class="fs-2">{{choicePhrase}}</span>
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
  name: 'Choice',
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
#choice-project {
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
.choice-select {
  display: flex;
  flex-direction: row;
}
</style>