<template>
  <div class="textarea-box" :class="{filled: filled}">
    <textarea v-bind="$attrs" :id="id" :placeholder="placeholder" :value="value" @input="updateInput" :maxlength="maxlength"/>
    <label v-if="placeholder" :for="id">{{placeholder}}</label>
    <div class="length">({{length}} / {{maxlength}})</div>
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
    placeholder: {
      type: String,
      default: ""
    },
    maxlength: {
      type: Number,
      default: 100
    },
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    updateInput(event) {
      this.value = event.target.value
      this.$emit('input', this.value)
    }
  },
  computed: {
    filled() {
      return this.value.length !== 0
    },
    length() {
      return this.value.length
    }
  },
  beforeMount() {
    this.$attrs.value && (this.value = this.$attrs.value)
  }
}
</script>

<style scoped>
  .textarea-box {
    position: relative;
    height: 13rem;
  }
  .textarea-box textarea {
    width: 100%;
    height: 10rem;
    resize: none;
    transition: all .25s;
    margin-top: .5rem;
    padding: 1rem .6rem;
    border: 1px solid var(--base-color);
    border-radius: 0;
    background-color: white !important;
  }
  .textarea-box textarea::placeholder {
    transition: opacity .15s ease-out;
    opacity: 1;
  }
  .textarea-box label {
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
  .textarea-box textarea:focus::placeholder {
    opacity: 0;
  }
  .textarea-box textarea:focus + label,
  .textarea-box.filled textarea + label {
    opacity: 1;
    top: .1rem;
    background-color: white;
  }
  .textarea-box textarea:focus{
    outline: none;
    border-color: var(--active-color);
  }
  .textarea-box .length {
    position: relative;
    top: 0;
    float: right;
    margin-right: 1rem;
  }
</style>