<template>
  <div :class="{thumbnail: true, clickable: clickable}" @click="handleClick">
    <img-component :src="imgSrc" :title="title" class="thumbnail-img" ratio="3/4"
      @mount="activate" @unmount="deactivate" @error="error"/>
  </div>
</template>

<script>
import ImgComponent from '../../utils/ImgComponent.vue'

export default{
  name: 'components.article.list.cell',
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    ImgComponent
  },
  data() {
    return {
      clickable: false
    }
  },
  methods: {
    handleClick() {
      this.clickable && this.$emit('clicked', this.article.no)
    },
    activate() {
      this.clickable = true
    },
    deactivate() {
      this.clickable = false
    },
    error() {
      this.deactivate()
      this.$emit('error', this.article.no)
    }
  },
  computed: {
    title() {
      return this.article.title ? this.article.title : ''
    },
    imgSrc() {
      const image = this.article.images
      return image ? image.link : ''
    }
  },
}
</script>

<style scoped>
  .thumbnail {
    border: 1px solid var(--active-bg-color);
    border-radius: 4px;
    overflow: hidden;
    transition: all .25s ease-in-out;
  }
  .thumbnail * {
    pointer-events: none;
  }
  .thumbnail > .thumbnail-img {
    transition: all .25s ease-in-out;
  }
  .thumbnail.clickable {
    cursor: pointer;
    border-color: var(--base-color)
  }
  .thumbnail.clickable:hover,
  .thumbnail.clickable:focus {
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: var(--active-color);
  }
  .thumbnail.clickable:hover {
    transform: translateY(-1px);
  }
  .thumbnail.clickable:active {
    background-color: var(--active-bg-color);
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--active-color);
    transform: translateY(0);
  }
  .thumbnail.clickable:hover > .thumbnail-img,
  .thumbnail.clickable:active > .thumbnail-img {
    opacity: 0.7;
  }
</style>