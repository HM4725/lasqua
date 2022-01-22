<template>
  <base-icon class="loading-icon" viewBox="0 0 100 100" :size="size">
    <circle cx="84" cy="50" r="10">
      <animate attributeName="r" repeatCount="indefinite" dur="0.5s" calcMode="spline" keyTimes="0;1" values="6;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
      <animate attributeName="fill" repeatCount="indefinite" dur="2s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#000000;#000000;#000000;#000000;#000000" begin="0s"></animate>
    </circle>
    <circle cx="16" cy="50" r="10">
      <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;6;6;6" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
      <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
    </circle>
    <circle cx="50" cy="50" r="10">
      <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;6;6;6" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
      <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
    </circle>
    <circle cx="84" cy="50" r="10">
      <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;6;6;6" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1s"></animate>
      <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1s"></animate>
    </circle>
    <circle cx="16" cy="50" r="10">
      <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;6;6;6" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.5s"></animate>
      <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.5s"></animate>
    </circle>
  </base-icon>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default{
  name: 'components.icons.loading',
  props: {
    size: {
      type: Number,
      default: 32
    },
  },
  components: {
    BaseIcon
  },
}
</script>

<style scoped>
  .loading-icon {
    fill: var(--base-icon);
  }
</style>