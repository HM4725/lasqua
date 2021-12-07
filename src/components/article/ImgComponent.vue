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
      imgSrc: require('@/assets/svg/spinner-3x4.svg'),
    }
  },
  methods: {
    lazyLoading(src) {
      let image = new Image()
      image.src = src
      image.onload = () => {
        this.imgSrc = src
        this.$parent.activate && this.$parent.activate()
      }
      image.onerror = () => {
        src !== '' && console.error(`NOT FOUND: ${src}`)
      }
    }
  },
  watch: {
    src(newVal) {
      this.lazyLoading(newVal)
    }
  },
  mounted() {
    this.lazyLoading(this.src)
  }
}
</script>

<style scoped>
img {
  aspect-ratio: 3 / 4;
  width: 100%;
  object-fit: cover;
}
</style>