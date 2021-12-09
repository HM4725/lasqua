<template>
  <div class="input-box" :class="{filled: filled, error: error}">
    <input v-bind="$attrs" :type="type" :id="id" :placeholder="placeholder" v-model="value" @focus="enter" ref="input"/>
    <label v-if="placeholder" :for="id">{{placeholder}}</label>
  </div>
</template>

<script>
export default{
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      error: false
    }
  },
  methods: {
    getValue() {
      return this.value
    },
    occurError() {
      this.error = true;
    },
    enter() {
      this.error = false;
    },
  },
  computed: {
    filled() {
      return this.value.length !== 0
    }
  },
  mounted() {
    if(this.focus) {
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
  .input-box {
    position: relative;
  }
  .input-box input {
    width: 100%;
    transition: all .25s;
    margin-top: .5rem;
    padding: .6rem;
    border: 1px solid var(--base-color);
    border-radius: 0;
    background-color: white !important;
  }
  .input-box input::placeholder {
    transition: opacity .15s ease-out;
    opacity: 1;
  }
  .input-box label {
    position: absolute;
    left: .6rem;
    top: 1rem;
    padding: 0 1px;
    font-size: .9rem;
    height: 1rem;
    line-height: 1rem;
    transition: all 0.25s ease-out;
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
  .input-box.error input {
    border-color: red;
  }
  .input-box.error label {
    color: red;
  }
  .input-box.error {
    animation: shake .5s;
  }
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -1px) rotate(-1deg); }
    20% { transform: translate(-1px, 0px) rotate(1deg); }
    30% { transform: translate(1px, 1px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 1px) rotate(-1deg); }
    60% { transform: translate(-1px, 1px) rotate(0deg); }
    70% { transform: translate(1px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 1px) rotate(0deg); }
    100% { transform: translate(1px, -1px) rotate(-1deg); }
  }
</style>