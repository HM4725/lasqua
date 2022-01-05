<template>
  <div :class="{tooltip: true, 'tooltip-hover': hover, 'tooltip-focus': focus, show: show}">
    <slot></slot>
    <span class="tooltip-text">{{text}}</span>
  </div>
</template>

<script>
export default{
  props: {
    text: String,
    focus: Boolean,
    hover: Boolean
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.focus && (this.show = true)
    setTimeout(() => {this.show = false}, 3000)
  }
}
</script>
  
<style scoped>
  .tooltip {
    width: 100%;
    position: relative;
    display: inline-block;
  }
  .tooltip > .tooltip-text {
    display: inline-block;
    opacity: 0;
    visibility: hidden;
    background-color: var(--base-color);
    color: var(--active-bg-color);
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    top: 120%;
    left: 50%;
    width: 180px;
    margin-left: -90px;
    z-index: 1;
    word-break: keep-all;
    transition: all .25s ease-in-out;
  }
  .tooltip > .tooltip-text::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--base-color) transparent;
  }
  .tooltip.tooltip-focus:focus-within .tooltip-text {
    opacity: 1;
    visibility: visible;
  }
  .tooltip.tooltip-focus:active:focus-within .tooltip-text {
    opacity: 0;
    visibility: hidden;
  }
  .tooltip.tooltip-hover:hover .tooltip-text {
    opacity: 1;
    visibility: visible;
  }
  .tooltip.show .tooltip-text {
    opacity: 1;
    visibility: visible;
  }
</style>