<template>
  <div class="input-box" :class="{filled: filled}">
    <input v-bind="$attrs" :type="type" :id="id" :placeholder="iplaceholder" 
      :value="value" @input="updateInput" ref="input"
      @focus="handleFocus" @blur="handleBlur"
      :class="{blank: subplaceholder===''}"/>
    <label v-if="placeholder" :for="id">{{placeholder}}</label>
  </div>
</template>

<script>
export default{
  name: 'components.form.input',
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
    subplaceholder: {
      type: String,
      default: ""
    },
    focus: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      value: '',
      input: false
    }
  },
  computed: {
    filled() {
      return this.value.length !== 0
    },
    iplaceholder() {
      if(this.input) {
        return this.subplaceholder === "" ?
          this.placeholder : this.subplaceholder
      } else {
        return this.placeholder
      }
    }
  },
  methods: {
    updateInput(event) {
      this.value = event.target.value
      this.$emit('input', this.value)
    },
    write(text) {
      this.value = text
      this.$emit('input', text)
    },
    handleFocus() {
      this.input = true
    },
    handleBlur() {
      this.input = false
    }
  },
  beforeMount() {
    this.$attrs.value && (this.value = this.$attrs.value)
  },
  mounted() {
    this.focus && this.$refs.input.focus()
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
    width: 100%;
  }
  .input-box input {
    width: 100%;
    transition: all .25s;
    margin-top: 8px;
    padding: 10px;
    border: 1px solid var(--base-color);
    border-radius: 4px;
    background-color: white !important;
  }
  .input-box input::placeholder {
    transition: opacity .15s ease-out;
    color: #707070;
    opacity: 1;
  }
  .input-box label {
    position: absolute;
    left: 10px;
    top: 16px;
    padding: 0 1px;
    font-size: .9em;
    height: 16px;
    line-height: 16px;
    transition: all 0.25s ease-out;
    white-space: nowrap;
    z-index: 1;
    opacity: 0;
  }
  .input-box > input.blank:focus::placeholder {
    opacity: 0;
  }
  .input-box > input:focus + label,
  .input-box.filled > input + label {
    opacity: 1;
    top: 1px;
    background-color: white;
  }
  .input-box > input:focus{
    outline: none;
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
  .input-box > input:disabled{
    color: #707070;
    border-color: var(--disabled-color);
  }
</style>