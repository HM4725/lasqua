<template>
  <img :style="{aspectRatio: ratio}" :src="imgSrc" :alt="title" :title="title" ref="image"/>
</template>

<script>
export default{
  props: {
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    ratio: {
      type: String,
      default: 'unset'
    }  
  },
  data() {
    return {
      imgSrc: require('@/assets/svg/blank-3x4.svg')
    }
  },
  watch: {
    src:{
      handler() {
        this.lazyLoading(this.src)
      },
      immediate: true
    }
  },
  methods: {
    lazyLoading(src) {
      if(src) {
        this.imgSrc = require('@/assets/svg/spinner-3x4.svg')
        let image = new Image()
        image.src = src
        image.onload = () => {
          this.imgSrc = src
          this.$emit("mount")
        }
        image.onerror = () => {
          src !== '' && console.error(`NOT FOUND: ${src}`)
          this.$emit("error")
        }
      } else {
        this.imgSrc = require('@/assets/svg/blank-3x4.svg')
        this.$emit("unmount")
      }
    }
  },
}
</script>

<style scoped>
img {
  display: block;
  width: 100%;
  object-fit: cover;
}
</style>