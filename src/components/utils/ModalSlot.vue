<template>
  <form class="modal-component" @submit.prevent>
    <transition name="modal">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper" @click="clickOutside">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <footer class="modal-footer">
              <slot name="footer">
                <default-button class="button" value="취소" @click="close"/>
                <default-button class="button" type="submit" value="확인"
                  @click="submit"/>
              </slot>
            </footer>

          </div>
        </div>
      </div>
    </transition>
  </form>
</template>

<script>
import DefaultButton from '../buttons/DefaultButton.vue'

export default{
  name: 'components.utils.modal.slot',
  emits: [
    'close',
    'submit'
  ],
  components: {
    DefaultButton
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    show() {
      this.showModal = true
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.touchAction = 'none'
    },
    submit() {
      this.showModal = false
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      this.$emit("submit")
    },
    close() {
      this.showModal = false
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      this.$emit("close")
    },
    clickOutside(e) {
      let el = e.target
      if(el.classList.contains('modal-wrapper')) {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
  .modal-component {
    display: inline-block;
  }
  .modal-mask {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100vw;
    height: -webkit-calc(100 * var(--vh, 1vh));
    height: -moz-calc(100 * var(--vh, 1vh));
    height: calc(100 * var(--vh, 1vh));
    background-color: rgba(0, 0, 0, .5);
    display: table;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 350px;
    max-height: -webkit-calc(100 * var(--vh, 1vh));
    max-height: -moz-calc(100 * var(--vh, 1vh));
    max-height: calc(100 * var(--vh, 1vh));
    overflow: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }
  .modal-header {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
  }
  .modal-body {
    margin: 20px 0;
    text-align: left;
  }
  .modal-footer {
    text-align: right;
    padding: 16px 0;
  }
  .modal-footer > .button {
    margin-left: 16px;
  }
  
  .modal-enter-active {
    transition: opacity .3s cubic-bezier(0,.7,.3,1);
  }
  .modal-leave-active {
    transition: opacity .3s cubic-bezier(.7,0,1,.3);
  }
  .modal-leave-active .modal-container {
    transition: transform .3s cubic-bezier(0,.7,.3,1);
  }
  .modal-enter-from,
  .modal-leave-active {
    opacity: 0;
  }
  .modal-leave-active .modal-container {
    transform: scale(1.05);
  }
</style>
