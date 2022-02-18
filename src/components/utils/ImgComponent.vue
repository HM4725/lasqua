<template>
  <div class="img-component">
    <div v-if="ratio" class="img" :class="{loading: loading.process}"
      :style="style" :title="title"></div>
    <img v-else :src="imgSrc" :title="title" :class="{loading: loading.process}"/>
  </div>
</template>

<script>
export default{
  name: 'components.utils.img',
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
      default: ''
    }  
  },
  data() {
    return {
      imgSrc: '',
      style: {
        backgroundImage: ``,
        paddingTop: ''
      },
      loading: {
        src: require('@/assets/svg/loading.svg'),
        process: false
      }
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
        this.loading.process = true
        this._setSrc(this.loading.src)

        const image = new Image()
        image.src = src
        image.onload = () => {
          this.loading.process = false
          this._setSrc(image.src)
          this.$emit("mount")
        }
        image.onerror = () => {
          if(src !== '') {
            console.error(`NOT FOUND: ${src}`)
            this.$emit("error")
          }
          this.loading.process = false
          this._unsetSrc()
        }
      } else {
        this.loading.process = false
        this._unsetSrc()
        this.$emit("unmount")
      }
    },
    _setSrc(src) {
      if(this.ratio) {
        this.style.backgroundImage = `url(${src})`
      } else {
        this.imgSrc = src
      }
    },
    _unsetSrc() {
      if(this.ratio) {
        this.style.backgroundImage = ''
      } else {
        this.imgSrc = ''
      }
    }
  },
  created() {
    if(this.ratio) {
      const aspectRatio = this.ratio.split('/')
      const width = parseInt(aspectRatio[0])
      const height = parseInt(aspectRatio[1])
      const heightRatio = 100 / width * height
      this.style.paddingTop = isFinite(heightRatio) ?
        `${heightRatio}%` : '100%'
    }
  }
}
</script>

<style scoped>
  .img-component {
    width: 100%;
    text-align: center;
  }
  .img-component > div.img{
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .img-component > div.img.loading {
    background-size: initial;
  }
  img {
    display: inline-block;
    width: 100%;
  }
  img.loading {
    width: initial;
  }
</style>