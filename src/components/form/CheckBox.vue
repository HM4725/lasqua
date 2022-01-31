<template>
  <div class="check-box">
    <input type="checkbox" :id="`${id}_input`" v-model="checked" @change="toggle">
    <label :for="`${id}_input`">{{value}}</label>
  </div>
</template>

<script>
export default{
  name: 'components.form.check',
  emits: ['checked'],
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: '체크박스'
    }
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    // Event API
    toggle() {
      this.$emit('checked', this.checked)
    },
    // Parent API
    check() {
      this.checked = true
    },
    uncheck() {
      this.checked = false
    }
  }
}
</script>

<style scoped>
  .check-box {
    display: inline-block;
    position: relative;
  }
  input[type=checkbox] + label{
    cursor: pointer;
    padding-left:25px;
  }
  input[type="checkbox"] + label:before {
    content: "";
    width: 20px;
    height: 20px;
    margin-right: 10px;
    position: absolute;
    top: 2px;
    left: 0;
    background-color: white;
    border-radius: 2px;
    box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8); 
  }
  input[type="checkbox"]:checked + label:before {
    content: "\2714";
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);  
    font-size: 18px; 
    font-weight:600; 
    color: red;  
    background: var(--active-bg-color);
    text-align: center;  
  }
  input[type="checkbox"] {
    display: none;
  }
</style>