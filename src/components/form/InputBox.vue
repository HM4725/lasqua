<template>
  <div class="input-box" :class="{filled: filled}">
    <input :id="title" :placeholder="title" :type="type" v-model="value"/>
    <label :for="title">{{title}}</label>
  </div>
</template>

<script>
export default{
  props: {
    type: {
      type: String,
      default: "text"
    },
    title: {
      type: String,
      default: "Box"
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    getValue() {
      return this.value
    }
  },
  computed: {
    filled() {
      return this.value.length !== 0
    }
  }
}
</script>

<style scoped>
  .input-box {
    position: relative;
  }
  .input-box input {
    transition: all 1s;
    margin-top: .5rem;
    padding: 4px 6px;
    border: 1px solid var(--base-color);
    border-radius: 0;
    background-color: white;
  }
  .input-box input::placeholder {
    transition: opacity .25s ease-out;
    opacity: 1;
  }
  .input-box label {
    position: absolute;
    left: 7px;
    top: 1rem;
    padding: 0 1px;
    font-size: .9rem;
    height: 1rem;
    line-height: 1rem;
    transition: all 0.5s ease-out;
    overflow: hidden;
    white-space: nowrap;
    z-index: 1;
    opacity: 0;
  }
  .input-box input:focus::placeholder {
    opacity: 0;
  }
  .input-box input:focus + label,
  .input-box.filled input + label {
    opacity: 1;
    top: .1rem;
    background-color: white;
  }
  .input-box input:focus{
    outline: none;
    border-color: var(--active-color);
  }
</style>