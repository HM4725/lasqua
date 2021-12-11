<template>
  <svg class="icon" :width="size" :height="size">
    <slot>Not Implemented!</slot>
  </svg>
</template>

<script>
export default{
  props: {
    size: {
      type: Number,
      default: 32
    },
  }
}
</script>

<style>
  .icon {
    fill: var(--base-color);
    transition: fill .25s ease-in-out;
    cursor: pointer;
    display: block;
  }
  .icon.disabled {
    fill: var(--active-color);
  }
  .icon.disabled > * {
    stroke: var(--active-color);
  }
  .icon:hover {
    fill: var(--active-color);
  }
  .icon:active {
    fill: var(--active-color);
  }
  .icon > * {
    stroke: var(--base-color);
    transition: stroke .25s ease-in-out;
  }
  .icon:hover > * {
    stroke: var(--active-color);
  }
  .icon:active > * {
    stroke: var(--active-color);
  }
</style>