<template>
  <svg class="icon" :width="size" :height="size">
    <slot>Not Implemented!</slot>
  </svg>
</template>

<script>
export default{
  name: 'components.icons.base',
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
    transition: fill .15s ease-out;
    cursor: pointer;
    display: inline-block;
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
    transition: stroke .15s ease-out;
  }
  .icon:hover > * {
    stroke: var(--active-color);
  }
  .icon:active > * {
    stroke: var(--active-color);
  }
</style>