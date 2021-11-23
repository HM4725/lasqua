<template>
  <div id="hamburger-button-icon" @click="toggle" :class="{open: isOpen}">
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
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
#hamburger-button-icon{
  width: 30px;
  height: 24px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
  padding: 3px;
}

#hamburger-button-icon span{
  display: block;
  position: absolute;
  width: 100%;
  height: 4px;
  background: black;
  border-radius: 4px;
  opacity: 1;
  left: 0;
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
  top: 0px;
}

#hamburger-button-icon span:nth-child(2),#hamburger-button-icon span:nth-child(3) {
  top: 9px;
}

#hamburger-button-icon span:nth-child(4) {
  top: 18px;
}

#hamburger-button-icon.open span:nth-child(1) {
  opacity: 0;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}

#hamburger-button-icon.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#hamburger-button-icon.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#hamburger-button-icon.open span:nth-child(4) {
  opacity: 0;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}

</style>