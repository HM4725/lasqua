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
      imgSrc: require('../../assets/svg/spinner-3x4.svg'),
      dataSrc: 'no!'
    }
  },
  watch: {
    src() {
      if(this.src !== '') {
        let image = new Image()
        image.src = this.src
        image.onload = () => {
          this.imgSrc = this.src
        }
      }
    }
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