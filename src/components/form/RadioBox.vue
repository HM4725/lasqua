<template>
  <div class="radio-box-wrapper">
    <fieldset class="radio-box">
      <legend v-if="title">{{title}}</legend>
      <div class="option" :id="id" v-for="(option, key) in options" :key="key">
        <input type="radio" :name="id" :id="id + '-' + key" v-model="radioValue" :value="key">
        <label :for="id + '-' + key">{{option}}</label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default{
  name: 'components.form.radio',
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
      default: () => {}
    },
    checked: {
      type: String,
    }
  },
  data() {
    return {
      radioValue: this.checked,
    }
  },
  methods: {
    getValue() {
      return this.radioValue
    },
    isLast(i) {
      return i === this.options.length - 1
    }
  }
}
</script>

<style scoped>
  fieldset.radio-box {
    all: unset;
    position: relative;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    transition: all .25s;
    margin-top: .7rem;
    padding: .5rem 2px 0 2px;
    border: 1px solid var(--base-color);
    border-radius: 4px;
    background-color: white;
  }
  fieldset.radio-box > legend {
    position: absolute;
    background-color: white;
    font-size: .9rem;
    height: 1rem;
    line-height: 1rem;
    top: -0.5rem;
    left: .6rem;
  }
  .option {
    border: 1px solid var(--base-color);
    border-radius: 4px;
    flex: 1;
    margin: 3px;
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
  .option > input[type="radio"]:checked + label {
    font-weight: bolder;
    background-color: var(--active-bg-color);
    border-radius: 4px;
  }
</style>