<template>
  <div :class="{thumbnail: true, activate: active}" ref="thumbnail">
    <img-component :src="imgSrc" :title="title" class="thumbnail-img" @img-load="activate"/>
  </div>
</template>

<script>
import ImgComponent from './ImgComponent.vue'

function getExtension(file) {
  const idx = file.lastIndexOf('.')
  return idx !== -1 ? file.substring(idx) : ""
}

export default{
  props: {
    article: {
      type: Object
    },
  },
  components: {
    ImgComponent
  },
  data() {
    return {
      active: false,
    }
  },
  methods: {
    activate() {
      this.active = true
      if(getExtension(this.article.images.link) !== '.svg') {
        this.$refs.thumbnail.addEventListener("click", () => {
          this.$router.push(this.link)
        })
      }
    },
  },
  computed: {
    title() {
      return this.article.title ? this.article.title : '없음'
    },
    imgSrc() {
      return this.article.images ? this.article.images.link : ''
    },
    link() {
      return this.article.no ? `/article/view?no=${this.article.no}` : '.'
    }
  }
}
</script>

<style scoped>
  .thumbnail {
    border: 1px solid var(--active-bg-color);
    border-radius: .25rem;
    transition: all .25s ease-in-out;
  }
  .thumbnail > .thumbnail-img {
    border-radius: calc(0.25rem - 1px);
    transition: all .25s ease-in-out;
  }
  .thumbnail.activate {
    cursor: pointer;
    border-color: var(--base-color)
  }
  .thumbnail.activate:hover,
  .thumbnail.activate:focus {
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: var(--active-color);
  }
  .thumbnail.activate:hover {
    transform: translateY(-1px);
  }
  .thumbnail.activate:active {
    background-color: var(--active-bg-color);
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--active-color);
    transform: translateY(0);
  }
  .thumbnail.activate:hover > .thumbnail-img,
  .thumbnail.activate:active > .thumbnail-img {
    opacity: 0.7;
  }
</style>