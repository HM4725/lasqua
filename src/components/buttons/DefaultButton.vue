<template>
  <button type="button" class="button" :class="{'after': after}">
    <span>{{value}}</span>
    <after-icon class="after-icon" v-if="after"/>
  </button>
</template>

<script>
import AfterIcon from '../icons/AfterIcon.vue'

export default {
  name: 'components.buttons.default',
  components: {
    AfterIcon
  },
  props: {
    value: {
      type: String,
      default: "버튼"
    },
    after: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.button {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid var(--base-color);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--base-color);
  cursor: pointer;
  display: inline-flex;
  font-size: 1em;
  font-weight: 400;
  justify-content: center;
  line-height: 1.25;
  word-break: keep-all;
  margin: 0;
  min-height: 3em;
  padding: -webkit-calc(.875em - 1px) -webkit-calc(1.5em - 1px);
  padding: -moz-calc(.875em - 1px) -moz-calc(1.5em - 1px);
  padding: calc(.875em - 1px) calc(1.5em - 1px);
  position: relative;
  text-decoration: none;
  transition: all .15s ease-in-out;
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}
.button:hover {
  border-color: var(--active-color);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: var(--active-color);
  transform: translateY(-1px);
}
.button:focus {
  outline: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  transform: translateY(-1px);
}
.button:active {
  background-color: var(--active-bg-color);
  border-color: var(--active-color);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: var(--active-color);
  transform: translateY(0);
}
.button.after {
  justify-content: space-between;
}
.button.after:hover > .after-icon {
  fill: var(--active-color);
}
.button.after:active > .after-icon {
  fill: var(--active-color);
}
</style>
