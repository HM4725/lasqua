<template>
  <div class="textarea-box" :class="{filled: length > 0}">
    <textarea v-bind="$attrs" :id="id" :placeholder="placeholder" :value="modelValue"
      @input="updateInput" :maxlength="maxlength"/>
    <label v-if="placeholder" :for="id">{{placeholder}}</label>
    <div class="length">({{length}} / {{maxlength}})</div>
  </div>
</template>

<script>
export default{
  name: 'components.form.textarea',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      validator: v => typeof v === 'string' ||
        v === null || v === undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 100
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
  computed: {
    length() {
      if(this.modelValue) {
        return this.modelValue.length
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>
  .textarea-box {
    position: relative;
    margin-bottom: 16px;
  }
  .textarea-box textarea {
    width: 100%;
    height: 100px;
    overflow: auto;
    resize: none;
    transition: all .25s;
    margin-top: 8px;
    padding: 16px 10px;
    border: 1px solid var(--base-color);
    border-radius: 4px;
    background-color: white !important;
  }
  .textarea-box textarea::placeholder {
    transition: opacity .15s ease-out;
    opacity: 1;
  }
  .textarea-box label {
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
  .textarea-box textarea:focus::placeholder {
    opacity: 0;
  }
  .textarea-box textarea:focus + label,
  .textarea-box.filled textarea + label {
    opacity: 1;
    top: 1px;
    background-color: white;
  }
  .textarea-box textarea:focus{
    outline: none;
    border-color: var(--active-color);
  }
  .textarea-box .length {
    position: relative;
    top: 0;
    margin-right: 16px;
    text-align: right;
  }
</style>
