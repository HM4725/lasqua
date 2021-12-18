<template>
  <div class="modal-component">
    <transition name="modal">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
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

            <div class="modal-footer">
              <slot name="footer">
                <default-button class="modal-default-button" value="확인" @click="close"/>
              </slot>
            </div>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DefaultButton from '../buttons/DefaultButton.vue'

export default{
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
    },
    close() {
      this.showModal = false
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 20rem;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
  .modal-header {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-default-button {
    float: right;
  }
  .modal-footer {
    display: flex;
    flex-direction: row-reverse;
  }
  .modal-enter-from {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter-from .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.01);
    transform: scale(1.01);
  }
</style>