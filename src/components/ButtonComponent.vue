<template>
  <button type="button" class="button" :class="{'after': after}">
    <span>{{value}}</span>
    <span v-if="after">
      <after-icon-component/>
    </span>
  </button>
</template>

<script>
import AfterIconComponent from './AfterIconComponent.vue'

export default {
  components: {
    AfterIconComponent
  },
  props: {
    value: String,
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: black;
  fill: black;
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  font-weight: 400;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: -webkit-calc(.875rem - 1px) -webkit-calc(1.5rem - 1px);
  padding: -moz-calc(.875rem - 1px) -moz-calc(1.5rem - 1px);
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all .25s ease-in-out;
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}
.button:hover,
.button:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
  fill: rgba(0, 0, 0, 0.65);
}
.button:hover {
  transform: translateY(-1px);
}
.button:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  fill: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
.button.after {
  justify-content: space-between;
}
</style>
