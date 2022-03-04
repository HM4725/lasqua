<template>
  <div class="radio-box-wrapper">
    <fieldset class="radio-box" :disabled="disabled">
      <legend v-if="title">{{title}}</legend>
      <div class="option" :id="id" v-for="(option, key) in options" :key="key">
        <input type="radio" @change="change" v-model="radioValue"
          :name="id" :id="id + '-' + key" :value="key">
        <label :for="id + '-' + key">{{option}}</label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default{
  name: 'components.form.radio',
  emits: ['update:modelValue'],
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      required: true,
      default: () => {}
    },
    modelValue: {
      validator: v => typeof v === 'string' ||
        v === null || v === undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radioValue: ''
    }
  },
  methods: {
    change(e) {
      this.radioValue = e.target.value
      this.$emit('update:modelValue', this.radioValue)
    }
  },
  created() {
    if(Object.keys(this.options).includes(this.modelValue)) {
      this.radioValue = this.modelValue
    } else {
      this.radioValue = 'N'
    }
  }
}
</script>

<style scoped>
  .radio-box-wrapper {
    width: 100%;
  }
  fieldset.radio-box {
    all: unset;
    position: relative;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    transition: all .25s ease-in-out;
    margin-top: 11px;
    padding: 8px 2px 0 2px;
    border: 1px solid var(--base-color);
    border-radius: 4px;
    background-color: white;
  }
  fieldset.radio-box > legend {
    position: absolute;
    background-color: white;
    font-size: .9em;
    height: 1em;
    line-height: 1em;
    top: -0.5em;
    left: .6em;
  }
  fieldset.radio-box:disabled {
    border-color: var(--disabled-color);
  }
  .option {
    border: 1px solid var(--base-color);
    border-radius: 4px;
    flex: 1;
    margin: 3px;
  }
  fieldset.radio-box:disabled > .option {
    border-color: var(--disabled-color);
    color: #707070;
  }
  .option > input[type="radio"] {
    display: none;
  }
  .option > label {
    display: block;
    cursor: pointer;
    padding: 3px;
    transition: all .25s ease-in-out;
  }
  fieldset.radio-box:disabled > .option > label {
    cursor: default;
  }
  .option > input[type="radio"]:checked + label {
    font-weight: bolder;
    background-color: var(--active-bg-color);
    border-radius: 4px;
  }
</style>