<template>
  <div class="input-box" :class="{filled: filled}">
    <input v-bind="$attrs" type="text" :id="id" :placeholder="placeholder" v-model="value" @click="input" @keydown.prevent/>
    <label v-if="placeholder" :for="id">{{placeholder}}</label>
    <modal-slot ref="dateBox">
      <template v-slot:header>
        <p class="f-title">생년월일</p>
      </template>
      <template v-slot:body>
        <div class="date-box">
          <input-box id="date-box-year" placeholder="생년(4자리)" @input="v=>year=v" @keydown.enter.prevent="close" ref="year" focus/>
          <input-box id="date-box-month" placeholder="월" @input="v=>month=v" @keydown.enter.prevent="close" ref="month"/>
          <input-box id="date-box-day" placeholder="일" @input="v=>day=v" @keydown.enter.prevent="close" ref="day"/>
        </div>
      </template>
    </modal-slot>
  </div>
</template>

<script>
import ModalSlot from '../utils/ModalSlot.vue'
import InputBox from './InputBox.vue'
export default{
  components: {
    ModalSlot,
    InputBox
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      year: '',
      month: '',
      day: ''
    }
  },
  methods: {
    getValue() {
      return this.value
    },
    input() {
      this.$refs.dateBox.show()
    },
    close() {
      if(this.isValidate()) {
        this.$refs.dateBox.close()
      } else {
        this.$refs.dateBox.show()
      }
    },
    isValidate() {
      let error = false
      if(this.year.length !== 4 || isNaN(this.year)) {
        this.$refs.year.occurError()
        error = true
      }
      if(![1,2].includes(this.month.length) || isNaN(this.month)) {
        this.$refs.month.occurError()
        error = true
      }
      if(![1,2].includes(this.day.length) || isNaN(this.day)) {
        this.$refs.day.occurError()
        error = true
      }
      if(!error) {
        const date = new Date(this.year, this.month - 1, this.day)
        if(parseInt(this.year) !== date.getFullYear() || 
           parseInt(this.month) !== date.getMonth() + 1 ||
           parseInt(this.day) !== date.getDate()) {
          console.log(date.getFullYear())
          console.log(date.getMonth())
          console.log(date.getDate())
          this.$refs.year.occurError()
          this.$refs.month.occurError()
          this.$refs.day.occurError()
          error = true
        }
      }
      return !error
    }
  },
  computed: {
    value() {
      const year = this.year
      const month = this.month < 10 ? '0' + parseInt(this.month) : this.month
      const day = this.day < 10 ? '0' + parseInt(this.day) : this.day 
      return this.year ? `${year}-${month}-${day}`: ''
    },
    filled() {
      return this.value !== ''
    }
  },
}
</script>

<style scoped>
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
    cursor: pointer;
    caret-color: transparent;
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
  .date-box {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-column-gap: 4px;
  }
</style>