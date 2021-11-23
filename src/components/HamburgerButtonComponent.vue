<template>
  <div id="hamburger-button-icon" @click="toggle" :class="{click: isClicked}">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default{
  data() {
    return {
      isClicked: false
    }
  },
  methods: {
    activate() {
      this.isClicked = true;
    },
    inactivate() {
      this.isClicked = false;
    },
    toggle() {
      this.isClicked = !this.isClicked
    }
  }
}
</script>

<style scoped>
#hamburger-button-icon{
  width: 30px;
  height: 27px;
  position: relative;
  cursor: pointer;
  padding: 5px;
}
#hamburger-button-icon:active {
  background-color: rgb(0 0 0 / 20%);
}
#hamburger-button-icon span{
  display: block;
  position: absolute;
  width: 20px;
  height: 2px;
  background: black;
  border-radius: 2px;
  opacity: 1;
  left: 5px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}
#hamburger-button-icon span:nth-child(1) {
  top: 5px;
}
#hamburger-button-icon span:nth-child(2),#hamburger-button-icon span:nth-child(3) {
  top: 12px;
}
#hamburger-button-icon span:nth-child(4) {
  top: 19px;
}
#hamburger-button-icon.click span:nth-child(1) {
  opacity: 0;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}
#hamburger-button-icon.click span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
#hamburger-button-icon.click span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
#hamburger-button-icon.click span:nth-child(4) {
  opacity: 0;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}
</style>