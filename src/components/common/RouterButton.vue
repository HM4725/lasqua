<template>
  <default-button @click="$router.push(link)" :value="link" :after="after"/>
</template>

<script>
import DefaultButton from './DefaultButton.vue'

export default{
  components: {
    DefaultButton
  },
  props: {
    link: {
      type: String,
      default: "/"
    },
    after: Boolean
  }
}
</script>