<template>
  <img :src="imgSrc" :alt="title" :title="title" ref="image"/>
</template>

<script>
export default{
  props: {
    title: String,
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imgSrc: require('@/assets/svg/blank-3x4.svg')
    }
  },
  watch: {
    src() {
      this.lazyLoading(this.src)
    }
  },
  methods: {
    lazyLoading(src) {
      this.imgSrc = require('@/assets/svg/spinner-3x4.svg')
      let image = new Image()
      image.src = src
      image.onload = () => {
        this.imgSrc = src
        this.$emit("imgLoad")
      }
      image.onerror = () => {
        src !== '' && console.error(`NOT FOUND: ${src}`)
        this.$emit("error")
      }
    }
  },
  beforeMount() {
    if(this.src) {
      this.imgSrc = this.src
      this.$emit("imgLoad")
    }
  }
}
</script>

<style scoped>
img {
  display: block;
  aspect-ratio: 3 / 4;
  width: 100%;
  object-fit: cover;
}
</style>