<template>
  <default-button @click="$router.push(link)" :value="value" :after="after"/>
</template>

<script>
import DefaultButton from './DefaultButton.vue'

export default{
  name: 'components.buttons.router',
  components: {
    DefaultButton
  },
  props: {
    link: {
      type: String,
      default: "/"
    },
    value: {
      type: String,
      default: "link"
    },
    after: Boolean
  },
}
</script>